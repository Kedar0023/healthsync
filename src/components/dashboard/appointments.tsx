"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddAppointmentDialog } from "@/components/dialogs/AddAppointmentDialog";
import { trpc } from "@/tRPC/client/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Appointment {
    id: string;
    doctorName: string;
    hospitalName?: string | null;
    date: Date | string;
    time: string;
    type: string;
    status: string;
    notes?: string | null;
}

interface AppointmentsProps {
    appointments?: Appointment[];
}

export function Appointments({ appointments: initialAppointments }: AppointmentsProps) {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    // Fetch appointments directly
    const { data: fetchedAppointments, isLoading } = trpc.user.getAppointments.useQuery();
    const deleteAppointmentMutation = trpc.user.deleteAppointment.useMutation({
        onSuccess: () => {
            toast.success("Appointment deleted successfully");
            setIsDeleteConfirmOpen(false);
            setIsDetailsOpen(false);
            utils.user.getAppointments.invalidate();
        },
        onError: (error) => {
            toast.error(`Error deleting appointment: ${error.message}`);
        },
    });
    const utils = trpc.useUtils();

    // Use fetched appointments if available, fallback to props
    const appointments = fetchedAppointments || initialAppointments || [];

    const handleViewDetails = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsDetailsOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDetailsOpen(false);
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedAppointment) {
            deleteAppointmentMutation.mutate(selectedAppointment.id);
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
                        <CardTitle>Upcoming Appointments</CardTitle>
                        <CardDescription>Your scheduled healthcare appointments</CardDescription>
                    </div>
                    <AddAppointmentDialog />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">Loading appointments...</p>
                        </div>
                    ) : appointments.length > 0 ? (
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{appointment.doctorName}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(appointment.date)} at {appointment.time}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Type: {appointment.type}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewDetails(appointment)}
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
                                You don't have any upcoming appointments
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Appointment Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                {selectedAppointment && (
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Appointment Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-sm font-medium">Doctor</p>
                                    <p>{selectedAppointment.doctorName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Date & Time</p>
                                    <p>{formatDate(selectedAppointment.date)} at {selectedAppointment.time}</p>
                                </div>
                            </div>
                            {selectedAppointment.hospitalName && (
                                <div>
                                    <p className="text-sm font-medium">Hospital/Clinic</p>
                                    <p>{selectedAppointment.hospitalName}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium">Type</p>
                                <p>{selectedAppointment.type}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Status</p>
                                <p>{selectedAppointment.status}</p>
                            </div>
                            {selectedAppointment.notes && (
                                <div>
                                    <p className="text-sm font-medium">Notes</p>
                                    <p className="text-sm">{selectedAppointment.notes}</p>
                                </div>
                            )}
                        </div>
                        <DialogFooter className="flex justify-between items-center mt-4">
                            <Button variant="destructive" onClick={handleDeleteClick}>
                                Delete Appointment
                            </Button>
                            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this appointment? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-between items-center mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={deleteAppointmentMutation.isPending}
                        >
                            {deleteAppointmentMutation.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 