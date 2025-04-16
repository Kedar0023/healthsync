"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddPrescriptionDialog } from "@/components/dialogs/AddPrescriptionDialog";

interface Prescription {
    id: string;
    medication: string;
    dosage: string;
    frequency: string;
}

interface PrescriptionsProps {
    prescriptions?: Prescription[];
}

export function Prescriptions({ prescriptions = [] }: PrescriptionsProps) {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Prescriptions</CardTitle>
                    <CardDescription>Your current and past prescriptions</CardDescription>
                </div>
                <AddPrescriptionDialog />
            </CardHeader>
            <CardContent>
                {prescriptions.length > 0 ? (
                    <div className="space-y-4">
                        {prescriptions.map((prescription) => (
                            <div key={prescription.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">{prescription.medication}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {prescription.dosage} - {prescription.frequency}
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
                            You haven't added any prescriptions yet
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}