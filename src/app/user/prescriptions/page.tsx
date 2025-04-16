"use client";
import React from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { Prescriptions } from "@/components/dashboard/prescriptions";
import { CurrentMedications } from "@/components/dashboard/current-medications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPrescriptionDialog } from "@/components/dialogs/AddPrescriptionDialog";

const PrescriptionsPage: React.FC = () => {
    // Get session first to get user ID
    const { data: session, isLoading: sessionLoading } = trpc.getSession.useQuery();

    // Then fetch user data using the ID
    const { data: userData, isLoading: userLoading } = trpc.getUserData.useQuery(
        { userId: session?.user.id ?? "" },
        { enabled: !!session?.user.id }
    );

    // Fetch current medications
    const { data: currentMedications, isLoading: medicationsLoading } = trpc.user.getCurrentMedications.useQuery(
        undefined,
        { enabled: !!session?.user.id }
    );

    if (sessionLoading || userLoading || medicationsLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Prescriptions</h1>
                            <p className="text-muted-foreground mt-2">View and manage your medications</p>
                        </div>
                        <AddPrescriptionDialog />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Medication Schedule</CardTitle>
                                <CardDescription>Your daily medication schedule</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {currentMedications && currentMedications.length > 0 ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-medium mb-2">Morning</h3>
                                            <div className="space-y-2">
                                                {currentMedications
                                                    .filter(med => med.frequency.includes("Morning"))
                                                    .map(med => (
                                                        <div key={med.id} className="border rounded-lg p-3">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium">{med.name}</h4>
                                                                <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                                                    Before Breakfast
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{med.dosage}</p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Afternoon</h3>
                                            <div className="space-y-2">
                                                {currentMedications
                                                    .filter(med => med.frequency.includes("Afternoon"))
                                                    .map(med => (
                                                        <div key={med.id} className="border rounded-lg p-3">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium">{med.name}</h4>
                                                                <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                                                    After Lunch
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{med.dosage}</p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Evening</h3>
                                            <div className="space-y-2">
                                                {currentMedications
                                                    .filter(med => med.frequency.includes("Evening"))
                                                    .map(med => (
                                                        <div key={med.id} className="border rounded-lg p-3">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium">{med.name}</h4>
                                                                <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                                                    After Dinner
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{med.dosage}</p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">
                                            No current medications scheduled
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <CurrentMedications medications={currentMedications} />
                    </div>

                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
                            <TabsTrigger value="past">Past Prescriptions</TabsTrigger>
                            <TabsTrigger value="all">All Prescriptions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active" className="mt-6">
                            <Prescriptions
                                prescriptions={userData?.prescriptions?.filter(p => !p.isExpired)}
                            />
                        </TabsContent>

                        <TabsContent value="past" className="mt-6">
                            <Prescriptions
                                prescriptions={userData?.prescriptions?.filter(p => p.isExpired)}
                            />
                        </TabsContent>

                        <TabsContent value="all" className="mt-6">
                            <Prescriptions prescriptions={userData?.prescriptions} />
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline">Request Refill</Button>
                        <Button variant="outline">Print Prescriptions</Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PrescriptionsPage; 