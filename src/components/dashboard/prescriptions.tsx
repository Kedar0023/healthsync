"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddPrescriptionDialog } from "@/components/dialogs/AddPrescriptionDialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";

interface Medication {
    id: string;
    name: string;
    description?: string | null;
    dosage: string;
    frequency: string;
    when: string;
    sideEffects?: string | null;
}

interface Prescription {
    id: string;
    title: string;
    doctorName: string;
    medicationId: string;
    medication: Medication;
    startDate: Date | string;
    endDate?: Date | string | null;
    refills: number;
    status: string;
    notes?: string | null;
}


interface PrescriptionsProps {
    prescriptions?: Prescription[];
}

export function Prescriptions({ prescriptions: initialPrescriptions }: PrescriptionsProps) {
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Fetch prescriptions directly from the server
    const { data: fetchedPrescriptions, isLoading } = trpc.user.getPrescriptions.useQuery();
    const utils = trpc.useUtils();

    const deletePrescriptionMutation = trpc.user.deletePrescription.useMutation({
        onSuccess: () => {
            toast.success("Prescription deleted successfully");
            setShowDeleteConfirm(false);
            setShowDetails(false);
            utils.user.getPrescriptions.invalidate();
        },
        onError: (error) => {
            toast.error(`Error deleting prescription: ${error.message}`);
        }
    });

    // Use fetched prescriptions or fallback to props
    const prescriptions = fetchedPrescriptions || initialPrescriptions || [];

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString();
    };

    const handleViewDetails = (prescription: Prescription) => {
        setSelectedPrescription(prescription);
        setShowDetails(true);
    };

    const handleDelete = () => {
        if (selectedPrescription) {
            deletePrescriptionMutation.mutate(selectedPrescription.id);
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle>Prescriptions</CardTitle>
                        <CardDescription>Your current and past prescriptions</CardDescription>
                    </div>
                    <AddPrescriptionDialog />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">Loading prescriptions...</p>
                        </div>
                    ) : prescriptions.length > 0 ? (
                        <div className="space-y-4">
                            {prescriptions.map((prescription) => (
                                <div key={prescription.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{prescription.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {prescription.medication.name} - {prescription.medication.dosage}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {prescription.medication.frequency}, {prescription.medication.when}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewDetails(prescription)}
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
                                You don't have any prescriptions yet
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* View Details Dialog */}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                {selectedPrescription && (
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{selectedPrescription.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <p className="text-sm font-medium">Medication</p>
                                <p>{selectedPrescription.medication.name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Dosage</p>
                                    <p>{selectedPrescription.medication.dosage}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Frequency</p>
                                    <p>{selectedPrescription.medication.frequency}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium">When to Take</p>
                                <p>{selectedPrescription.medication.when}</p>
                            </div>
                            {selectedPrescription.medication.sideEffects && (
                                <div>
                                    <p className="text-sm font-medium text-amber-600">
                                        Side Effects
                                    </p>
                                    <p className="text-sm">{selectedPrescription.medication.sideEffects}</p>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Start Date</p>
                                    <p>{formatDate(selectedPrescription.startDate)}</p>
                                </div>
                                {selectedPrescription.endDate && (
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p>{formatDate(selectedPrescription.endDate)}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium">Doctor</p>
                                <p>{selectedPrescription.doctorName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Refills Remaining</p>
                                    <p>{selectedPrescription.refills}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Status</p>
                                    <p className={selectedPrescription.status === "Active" ? "text-green-600" : "text-gray-600"}>
                                        {selectedPrescription.status}
                                    </p>
                                </div>
                            </div>
                            {selectedPrescription.notes && (
                                <div>
                                    <p className="text-sm font-medium">Notes</p>
                                    <p className="text-sm whitespace-pre-wrap">{selectedPrescription.notes}</p>
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
                                Delete Prescription
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
                        Are you sure you want to delete this prescription? This action cannot be undone.
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
                            disabled={deletePrescriptionMutation.isPending}
                        >
                            {deletePrescriptionMutation.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}