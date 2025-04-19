"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddMedicalRecordDialog } from "@/components/dialogs/AddMedicalRecordDialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";

interface MedicalRecord {
    id: string;
    recordType: string;
    title: string;
    description?: string | null;
    date: Date | string;
    doctorName?: string | null;
    hospitalName?: string | null;
    fileUrl?: string | null;
}

interface MedicalRecordsProps {
    medicalRecords?: MedicalRecord[];
}

export function MedicalRecords({ medicalRecords = [] }: MedicalRecordsProps) {
    const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const utils = trpc.useUtils();
    const deleteMutation = trpc.user.deleteMedicalRecord.useMutation({
        onSuccess: () => {
            toast.success("Medical record deleted successfully");
            setShowDeleteConfirm(false);
            setShowDetails(false);
            utils.user.getMedicalRecords.invalidate();
        },
        onError: (error) => {
            toast.error(`Error deleting record: ${error.message}`);
        }
    });

    const handleViewDetails = (record: MedicalRecord) => {
        setSelectedRecord(record);
        setShowDetails(true);
    };

    const handleDelete = () => {
        if (selectedRecord) {
            deleteMutation.mutate(selectedRecord.id);
        }
    };

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle>Medical Records</CardTitle>
                        <CardDescription>Your medical history</CardDescription>
                    </div>
                    {!medicalRecords.length && <AddMedicalRecordDialog />}
                </CardHeader>
                <CardContent>
                    {medicalRecords.length > 0 ? (
                        <div className="space-y-4">
                            {medicalRecords.map((record) => (
                                <div key={record.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{record.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(record.date)}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Type: {record.recordType}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewDetails(record)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                                You don't have any medical records yet
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* View Details Dialog */}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                {selectedRecord && (
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{selectedRecord.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <p className="text-sm font-medium">Record Type</p>
                                <p>{selectedRecord.recordType}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Date</p>
                                <p>{formatDate(selectedRecord.date)}</p>
                            </div>
                            {selectedRecord.description && (
                                <div>
                                    <p className="text-sm font-medium">Description</p>
                                    <p className="whitespace-pre-wrap">{selectedRecord.description}</p>
                                </div>
                            )}
                            {selectedRecord.doctorName && (
                                <div>
                                    <p className="text-sm font-medium">Doctor</p>
                                    <p>{selectedRecord.doctorName}</p>
                                </div>
                            )}
                            {selectedRecord.hospitalName && (
                                <div>
                                    <p className="text-sm font-medium">Hospital/Clinic</p>
                                    <p>{selectedRecord.hospitalName}</p>
                                </div>
                            )}
                            {selectedRecord.fileUrl && (
                                <div>
                                    <p className="text-sm font-medium">File</p>
                                    <a
                                        href={selectedRecord.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Document
                                    </a>
                                </div>
                            )}
                        </div>
                        <DialogFooter className="flex justify-between items-center mt-4">
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setShowDetails(false);
                                    setShowDeleteConfirm(true);
                                }}
                            >
                                Delete Record
                            </Button>
                            <Button variant="outline" onClick={() => setShowDetails(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p className="py-4">
                        Are you sure you want to delete this medical record? This action cannot be undone.
                    </p>
                    <DialogFooter className="flex justify-between items-center mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 