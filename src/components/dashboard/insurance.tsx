"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Insurance {
    id: string;
    provider: string;
    policyNumber: string;
    status?: string;
}

interface InsuranceDisplayProps {
    insurances?: Insurance[];
}

export function InsuranceDisplay({ insurances = [] }: InsuranceDisplayProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle insurance update
    const handleInsuranceUpdate = () => {
        setIsLoading(true);
        toast.loading("Redirecting to insurance page...");
        setTimeout(() => {
            toast.dismiss();
            router.push('/user/insurance');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Insurance</CardTitle>
                <CardDescription>Your insurance details</CardDescription>
            </CardHeader>
            <CardContent>
                {insurances.length > 0 ? (
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Provider:</span>
                            <span className="font-medium">{insurances[0].provider}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Policy Number:</span>
                            <span className="font-medium">{insurances[0].policyNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium text-green-500">Active</span>
                        </div>
                        <Button variant="outline" className="mt-4 w-full" onClick={handleInsuranceUpdate} disabled={isLoading}>
                            Update Insurance Info
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">
                            No insurance information available
                        </p>
                        <Button onClick={handleInsuranceUpdate} disabled={isLoading}>Add Insurance</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 