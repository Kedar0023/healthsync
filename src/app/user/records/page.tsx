"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { MedicalRecords } from "@/components/dashboard/medical-records";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddMedicalRecordDialog } from "@/components/dialogs/AddMedicalRecordDialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

const MedicalRecordsPage: React.FC = () => {
    const [isExporting, setIsExporting] = useState(false);

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

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString();
    };

    const exportToPDF = () => {
        if (!userData || !userData.medicalRecords || userData.medicalRecords.length === 0) {
            toast.error("No medical records to export");
            return;
        }

        setIsExporting(true);
        try {
            // Create a new PDF document
            const pdf = new jsPDF();

            // Add title and patient information
            pdf.setFontSize(18);
            pdf.text("Medical Records Report", 105, 20, { align: "center" });

            pdf.setFontSize(12);
            pdf.text(`Patient: ${userData.name || "Unknown"}`, 20, 35);
            pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 42);

            // Add separator line
            pdf.setDrawColor(200, 200, 200);
            pdf.line(20, 45, 190, 45);

            // Group records by type
            const recordsByType: { [key: string]: any[] } = {};

            userData.medicalRecords.forEach(record => {
                if (!recordsByType[record.recordType]) {
                    recordsByType[record.recordType] = [];
                }
                recordsByType[record.recordType].push(record);
            });

            let yPosition = 55;

            // Add each record type with its records
            Object.entries(recordsByType).forEach(([type, records]) => {
                if (yPosition > 250) {
                    pdf.addPage();
                    yPosition = 20;
                }

                // Add section title
                pdf.setFontSize(14);
                pdf.text(`${type} Records (${records.length})`, 20, yPosition);
                yPosition += 10;

                // Create table for records
                const tableData = records.map(record => [
                    record.title,
                    formatDate(record.date),
                    record.doctorName || '-',
                    record.hospitalName || '-'
                ]);

                // Add table with autoTable plugin
                autoTable(pdf, {
                    startY: yPosition,
                    head: [['Title', 'Date', 'Doctor', 'Hospital/Clinic']],
                    body: tableData,
                    theme: 'striped',
                    headStyles: { fillColor: [66, 139, 202] },
                    margin: { top: 10 },
                });

                yPosition = (pdf as any).lastAutoTable.finalY + 20;
            });

            // Add a summary page with details of selected records
            if (userData.medicalRecords.length > 0) {
                pdf.addPage();
                pdf.setFontSize(16);
                pdf.text("Record Details", 105, 20, { align: "center" });

                let detailsY = 40;

                userData.medicalRecords.slice(0, 5).forEach((record, index) => {
                    if (detailsY > 250) {
                        pdf.addPage();
                        detailsY = 20;
                    }

                    pdf.setFontSize(12);
                    pdf.text(`Record #${index + 1}: ${record.title}`, 20, detailsY);
                    detailsY += 7;

                    pdf.setFontSize(10);
                    pdf.text(`Type: ${record.recordType}`, 25, detailsY);
                    detailsY += 6;

                    pdf.text(`Date: ${formatDate(record.date)}`, 25, detailsY);
                    detailsY += 6;

                    if (record.doctorName) {
                        pdf.text(`Doctor: ${record.doctorName}`, 25, detailsY);
                        detailsY += 6;
                    }

                    if (record.hospitalName) {
                        pdf.text(`Hospital/Clinic: ${record.hospitalName}`, 25, detailsY);
                        detailsY += 6;
                    }

                    if (record.description) {
                        pdf.text(`Description: ${record.description.substring(0, 100)}${record.description.length > 100 ? '...' : ''}`, 25, detailsY);
                        detailsY += 6;
                    }

                    detailsY += 10;
                });

                if (userData.medicalRecords.length > 5) {
                    pdf.text(`... and ${userData.medicalRecords.length - 5} more records`, 20, detailsY);
                }
            }

            // Save the PDF
            pdf.save("medical_records.pdf");
            toast.success("Medical records exported successfully");
        } catch (error) {
            console.error("Error exporting to PDF:", error);
            toast.error("Failed to export records. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

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
                        <Button
                            variant="outline"
                            onClick={exportToPDF}
                            disabled={isExporting || !userData?.medicalRecords?.length}
                        >
                            {isExporting ? "Exporting..." : "Export Records to PDF"}
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MedicalRecordsPage; 