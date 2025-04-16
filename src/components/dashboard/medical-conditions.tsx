"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddHealthConditionDialog } from "@/components/dialogs/AddHealthConditionDialog";

interface Allergy {
    id: string;
    name: string;
    type: string;
    severity: string | null;
    reaction: string | null;
}

interface ChronicCondition {
    id: string;
    condition: string;
    severity: string | null;
    diagnosisDate: string | null;
}

interface MedicalConditionsProps {
    allergies?: Allergy[];
    chronicConditions?: ChronicCondition[];
}

export function MedicalConditions({ allergies = [], chronicConditions = [] }: MedicalConditionsProps) {
    return (
        <Card>
            <CardHeader className="pb-2 flex justify-between">
                <div>
                    <CardTitle>Medical Conditions</CardTitle>
                    <CardDescription>Your allergies and conditions</CardDescription>
                </div>
                <AddHealthConditionDialog />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Allergies</h3>
                        {allergies.length > 0 ? (
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {allergies.map((allergy) => (
                                    <li key={allergy.id}>
                                        {allergy.name}
                                        {allergy.severity && <span> - {allergy.severity}</span>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No allergies recorded</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-2">Chronic Conditions</h3>
                        {chronicConditions.length > 0 ? (
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {chronicConditions.map((condition) => (
                                    <li key={condition.id}>
                                        {condition.condition}
                                        {condition.severity && <span> - {condition.severity}</span>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No chronic conditions recorded</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 