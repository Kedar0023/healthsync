"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddMedicalRecordDialog } from "@/components/dialogs/AddMedicalRecordDialog";

interface MedicalRecord {
    id: string;
    title: string;
    recordType: string;
    date: string;
}

interface MedicalRecordsProps {
    medicalRecords?: MedicalRecord[];
}

export function MedicalRecords({ medicalRecords = [] }: MedicalRecordsProps) {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>Your medical history and records</CardDescription>
                </div>
                <AddMedicalRecordDialog />
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
                                            {record.recordType} - {new Date(record.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Button variant="outline">View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                            You haven't added any medical records yet
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 