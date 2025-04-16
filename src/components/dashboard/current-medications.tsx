"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddCurrentMedicationDialog } from "@/components/dialogs/AddCurrentMedicationDialog";

interface CurrentMedication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
}

interface CurrentMedicationsProps {
    medications?: CurrentMedication[];
}

export function CurrentMedications({ medications = [] }: CurrentMedicationsProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Your ongoing medications</CardDescription>
            </CardHeader>
            <CardContent>
                {medications.length > 0 ? (
                    <div className="space-y-2">
                        {medications.map((medication) => (
                            <div key={medication.id} className="border rounded-lg p-3">
                                <div className="flex justify-between">
                                    <h3 className="font-medium">{medication.name}</h3>
                                    <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                        {medication.frequency}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">No current medications recorded</p>
                        <AddCurrentMedicationDialog />
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 