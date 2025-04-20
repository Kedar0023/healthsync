"use client";
import React from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { Appointments } from "@/components/dashboard/appointments";
import { Button } from "@/components/ui/button";

const AppointmentsPage: React.FC = () => {
    // Get session first to get user ID
    const { data: session, isLoading: sessionLoading } = trpc.getSession.useQuery();

    // Then fetch user data using the ID
    const { data: userData, isLoading: userLoading } = trpc.getUserData.useQuery(
        { userId: session?.user.id ?? "" },
        { enabled: !!session?.user.id }
    );

    if (sessionLoading || userLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-900"></div>
                </div>
            </div>
        );
    }
    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString();
    };
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <div className="sticky top-16 h-[95%] bg-green-200">
                    <Sidebar />
                </div>
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Appointments</h1>
                        <p className="text-muted-foreground mt-2">Manage your healthcare appointments</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Today</h2>
                                <div className="bg-muted/50 rounded-lg p-4 min-h-[150px] flex items-start justify-start">
                                    {userData?.appointments?.some(
                                        (apt) => new Date(apt.date).toDateString() === new Date().toDateString()
                                    ) ? (
                                        userData.appointments
                                            .filter(apt => new Date(apt.date).toDateString() === new Date().toDateString())
                                            .map(appointment => (
                                                <div key={appointment.id} className="border rounded-lg p-4 hover:opacity-50 w-full">
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

                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No appointments for today 😌</p>
                                    )}


                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
                                <Appointments
                                    appointments={userData?.appointments?.filter(
                                        (apt) =>
                                            new Date(apt.date) > new Date() &&
                                            new Date(apt.date).toDateString() !== new Date().toDateString()
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppointmentsPage; 