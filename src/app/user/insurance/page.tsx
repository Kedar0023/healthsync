"use client";
import React from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { InsuranceDisplay } from "@/components/dashboard/insurance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddInsuranceDialog } from "@/components/dialogs/AddInsuranceDialog";
import { Button } from "@/components/ui/button";

const InsurancePage: React.FC = () => {
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Insurance</h1>
                        <p className="text-muted-foreground mt-2">Manage your health insurance policies</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InsuranceDisplay insurances={userData?.insurances} />

                            <Card>
                                <CardHeader>
                                    <CardTitle>Insurance Claims</CardTitle>
                                    <CardDescription>Your recent insurance claims</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">
                                            No recent claims to display
                                        </p>
                                        <Button variant="outline">Submit a Claim</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Insurance Documents</CardTitle>
                                <CardDescription>Your insurance documents and policies</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {userData?.insurances && userData.insurances.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium">Health Insurance Policy</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Policy #{userData.insurances[0].policyNumber}
                                                    </p>
                                                </div>
                                                <Button variant="outline">Download</Button>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium">Coverage Details</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Plan documents
                                                    </p>
                                                </div>
                                                <Button variant="outline">View</Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">
                                            No insurance documents available
                                        </p>
                                        <AddInsuranceDialog />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default InsurancePage; 