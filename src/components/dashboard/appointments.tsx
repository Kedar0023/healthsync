"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddAppointmentDialog } from "@/components/dialogs/AddAppointmentDialog";

interface Appointment {
    id: string;
    doctorName: string;
    date: string;
    time: string;
}

interface AppointmentsProps {
    appointments?: Appointment[];
}

export function Appointments({ appointments = [] }: AppointmentsProps) {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled healthcare appointments</CardDescription>
                </div>
                <AddAppointmentDialog />
            </CardHeader>
            <CardContent>
                {appointments.length > 0 ? (
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">{appointment.doctorName}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
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
                            You don't have any upcoming appointments
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 