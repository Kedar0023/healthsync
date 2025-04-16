"use client";
import React from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { MedicalRecords } from "@/components/dashboard/medical-records";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddMedicalRecordDialog } from "@/components/dialogs/AddMedicalRecordDialog";

const MedicalRecordsPage: React.FC = () => {
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

    // Filter records by type
    const labTests = userData?.medicalRecords?.filter(record => record.recordType === "Lab Test") || [];
    const imagingReports = userData?.medicalRecords?.filter(record => record.recordType === "Imaging") || [];
    const consultations = userData?.medicalRecords?.filter(record => record.recordType === "Consultation") || [];
    const otherRecords = userData?.medicalRecords?.filter(record =>
        !["Lab Test", "Imaging", "Consultation"].includes(record.recordType)
    ) || [];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Medical Records</h1>
                            <p className="text-muted-foreground mt-2">View and manage your medical history</p>
                        </div>
                        <AddMedicalRecordDialog />
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid grid-cols-5 w-full">
                            <TabsTrigger value="all">All Records</TabsTrigger>
                            <TabsTrigger value="lab">Lab Tests</TabsTrigger>
                            <TabsTrigger value="imaging">Imaging</TabsTrigger>
                            <TabsTrigger value="consultations">Consultations</TabsTrigger>
                            <TabsTrigger value="other">Other</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-6">
                            <MedicalRecords medicalRecords={userData?.medicalRecords} />
                        </TabsContent>

                        <TabsContent value="lab" className="mt-6">
                            <MedicalRecords medicalRecords={labTests} />
                        </TabsContent>

                        <TabsContent value="imaging" className="mt-6">
                            <MedicalRecords medicalRecords={imagingReports} />
                        </TabsContent>

                        <TabsContent value="consultations" className="mt-6">
                            <MedicalRecords medicalRecords={consultations} />
                        </TabsContent>

                        <TabsContent value="other" className="mt-6">
                            <MedicalRecords medicalRecords={otherRecords} />
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline">Export Records</Button>
                        <Button variant="outline">Print Records</Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MedicalRecordsPage; 