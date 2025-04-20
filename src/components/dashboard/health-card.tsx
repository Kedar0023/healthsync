"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

interface HealthCardProps {
    userData?: {
        id: string;
        name?: string | null;
    };
}

export function HealthCard({ userData }: HealthCardProps) {
    // Generate URL for the QR code
    const qrCodeUrl = userData
        ? `${window.location.origin}/medical_details/${userData.id}`
        : `${window.location.origin}/medical_details/unknown`;

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Health Card</CardTitle>
                <CardDescription>Your digital health card</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg mb-4">
                        <QRCodeSVG value={qrCodeUrl} size={180} />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                        {userData
                            ? "Scan this QR code to share your health information"
                            : "QR code contains limited information"}
                    </p>
                    <Button className="mt-4 w-full" disabled={!userData}>
                        Download Card
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 