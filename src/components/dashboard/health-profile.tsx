"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateHealthProfileDialog } from "@/components/dialogs/UpdateHealthProfileDialog";
import { calculateAge } from "@/lib/utils";

interface UserData {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    bloodGroup?: string | null;
}

interface HealthProfileProps {
    userData?: UserData;
}

export function HealthProfile({ userData }: HealthProfileProps) {
    // Calculate age if date of birth is available
    const age = userData?.dateOfBirth ? calculateAge(new Date(userData.dateOfBirth)) : null;

    return (
        <Card>
            <CardHeader className="pb-2 flex justify-between">
                <div>
                    <CardTitle>Health Profile</CardTitle>
                    <CardDescription>Your basic health information</CardDescription>
                </div>
                <UpdateHealthProfileDialog userData={userData} />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{userData?.name || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{userData?.email || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{userData?.phone || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Date of Birth:</span>
                        <span className="font-medium">
                            {userData?.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : "Not specified"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span className="font-medium">{age || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Gender:</span>
                        <span className="font-medium">{userData?.gender || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Blood Type:</span>
                        <span className="font-medium">{userData?.bloodGroup || "Not specified"}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}