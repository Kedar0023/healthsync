"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { Prescriptions } from "@/components/dashboard/prescriptions";
import { CurrentMedications } from "@/components/dashboard/current-medications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPrescriptionDialog } from "@/components/dialogs/AddPrescriptionDialog";
import { toast, Toaster } from "sonner";

// Define interfaces locally
interface Medication {
    id: string;
    name: string;
    description?: string | null;
    dosage: string;
    frequency: string;
    when: string;
    sideEffects?: string | null;
}

interface Prescription {
    id: string;
    title: string;
    doctorName: string;
    medicationId: string;
    medication: Medication;
    startDate: Date | string;
    endDate?: Date | string | null;
    refills: number;
    status: string;
    notes?: string | null;
}

// Days of the week for the medication schedule
const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Time periods for medication schedule
const TIME_PERIODS = ["Morning", "Afternoon", "Evening", "Night"];

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

    // Get all medications for schedule display
    const { data: medications } = trpc.user.getMedications.useQuery(
        undefined,
        { enabled: !!session?.user.id }
    );

    // Fetch prescriptions for the schedule
    const { data: fetchedPrescriptions } = trpc.user.getPrescriptions.useQuery(
        undefined,
        { enabled: !!session?.user.id }
    );

    // Helper function to transform the prescription data to match the Prescription type
    const transformPrescriptions = (prescriptions: any[] | undefined): Prescription[] | undefined => {
        if (!prescriptions) return undefined;
        return prescriptions as unknown as Prescription[];
    };

    // Process the prescriptions data
    const prescriptions = transformPrescriptions(userData?.prescriptions);

    // Get dates for the current week (Sunday to Saturday)
    const getWeekDates = (date: Date) => {
        const day = date.getDay(); // 0 for Sunday, 6 for Saturday
        const diff = date.getDate() - day;

        return Array(7).fill(0).map((_, i) => {
            const d = new Date(date);
            d.setDate(diff + i);
            return d;
        });
    };

    // Group medications by day of week based on prescriptions
    const getMedicationsByDay = (day: string) => {
        if (!fetchedPrescriptions || !medications) return [];

        // Get the current week dates
        const today = new Date();
        const currentWeekDates = getWeekDates(today);

        // Find the date that corresponds to the provided day
        const targetDate = currentWeekDates.find(date =>
            date.toLocaleDateString('en-US', { weekday: 'long' }) === day
        );

        if (!targetDate) return [];

        // Find prescriptions that are active on the target date
        const activePrescriptions = fetchedPrescriptions.filter(prescription => {
            const startDate = new Date(prescription.startDate);
            const endDate = prescription.endDate ? new Date(prescription.endDate) : null;

            return startDate <= targetDate && (!endDate || endDate >= targetDate);
        });

        // Get the medication IDs from active prescriptions
        const activeMedicationIds = activePrescriptions.map(p => p.medicationId);

        // Return medications that are part of active prescriptions
        return medications.filter(med => activeMedicationIds.includes(med.id));
    };

    // Get today's medications based on active prescriptions
    const getTodaysMedications = () => {
        if (!fetchedPrescriptions || !medications) {
            return [];
        }

        const today = new Date();

        // Check if the prescription data includes medications
        if (fetchedPrescriptions.length > 0 && fetchedPrescriptions[0].medication) {
            // If prescriptions already include medication objects, use them directly
            return fetchedPrescriptions
                .filter(prescription => {
                    const startDate = new Date(prescription.startDate);
                    const endDate = prescription.endDate ? new Date(prescription.endDate) : null;
                    return startDate <= today && (!endDate || endDate >= today);
                })
                .map(p => p.medication);
        }

        // Find active prescriptions (where today is between start and end date)
        const activePrescriptions = fetchedPrescriptions.filter(prescription => {
            const startDate = new Date(prescription.startDate);
            const endDate = prescription.endDate ? new Date(prescription.endDate) : null;
            return startDate <= today && (!endDate || endDate >= today);
        });

        // Get the medication IDs from active prescriptions
        const activeMedicationIds = activePrescriptions.map(p => p.medicationId);

        // Return medications that are part of active prescriptions
        return medications.filter(med => activeMedicationIds.includes(med.id));
    };

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

    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });

    // Helper function to fix duplicate getMedicationsByTimePeriod
    const getMedicationsByTimePeriodFixed = (timePeriod: string) => {
        if (!medications) return [];
        return medications.filter(med =>
            med.when === timePeriod ||
            med.when.includes(timePeriod) ||
            (timePeriod === "Morning" && (med.when.includes("Breakfast") || med.when.includes("AM"))) ||
            (timePeriod === "Afternoon" && med.when.includes("Lunch")) ||
            (timePeriod === "Evening" && (med.when.includes("Dinner") || med.when.includes("PM"))) ||
            (timePeriod === "Night" && med.when.includes("Bedtime"))
        );
    };

    // Function to generate and print a PDF of prescriptions
    const handlePrintPrescriptions = () => {
        // Dynamically import jsPDF to ensure it only loads in client-side
        import('jspdf').then(({ jsPDF }) => {
            // Create a new PDF document
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(20);
            doc.setTextColor(0, 51, 102);
            doc.text("Your Prescription Schedule", 20, 20);

            // Add current date
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

            // Add a line separator
            doc.setDrawColor(220, 220, 220);
            doc.line(20, 35, 190, 35);

            // Start Y position for content
            let yPos = 45;

            // Add weekly schedule section
            doc.setFontSize(16);
            doc.setTextColor(0, 51, 102);
            doc.text("Weekly Medication Schedule", 20, yPos);
            yPos += 10;

            // Add each day's medications
            for (const day of DAYS_OF_WEEK) {
                const dayMedications = getMedicationsByDay(day);

                if (dayMedications.length > 0) {
                    // Add day header
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${day}:`, 20, yPos);
                    yPos += 6;

                    // Add each medication
                    doc.setFontSize(10);
                    dayMedications.forEach(med => {
                        // Check if we need a new page
                        if (yPos > 270) {
                            doc.addPage();
                            yPos = 20;
                        }

                        doc.setTextColor(0, 0, 0);
                        doc.text(`• ${med.name} (${med.dosage})`, 30, yPos);
                        yPos += 5;
                        doc.setTextColor(100, 100, 100);
                        doc.text(`   ${med.frequency}, ${med.when}`, 30, yPos);
                        yPos += 8;
                    });
                } else {
                    // No medications for this day
                    doc.setFontSize(10);
                    doc.setTextColor(150, 150, 150);
                    doc.text(`No medications scheduled for ${day}`, 30, yPos);
                    yPos += 8;
                }

                // Add some space after each day
                yPos += 4;

                // Check if we need a new page
                if (yPos > 270 && day !== DAYS_OF_WEEK[DAYS_OF_WEEK.length - 1]) {
                    doc.addPage();
                    yPos = 20;
                }
            }

            // Add a new page for active prescriptions
            doc.addPage();
            yPos = 20;

            // Add active prescriptions section
            doc.setFontSize(16);
            doc.setTextColor(0, 51, 102);
            doc.text("Active Prescriptions", 20, yPos);
            yPos += 10;

            if (fetchedPrescriptions && fetchedPrescriptions.length > 0) {
                fetchedPrescriptions.forEach(prescription => {
                    // Check if the prescription is active
                    const startDate = new Date(prescription.startDate);
                    const endDate = prescription.endDate ? new Date(prescription.endDate) : null;
                    const isActive = startDate <= today && (!endDate || endDate >= today);

                    if (isActive) {
                        // Check if we need a new page
                        if (yPos > 250) {
                            doc.addPage();
                            yPos = 20;
                        }

                        // Add prescription details
                        doc.setFontSize(12);
                        doc.setTextColor(0, 0, 0);
                        doc.text(`${prescription.title}`, 20, yPos);
                        yPos += 6;

                        doc.setFontSize(10);
                        doc.setTextColor(80, 80, 80);
                        doc.text(`Medication: ${prescription.medication.name}`, 25, yPos);
                        yPos += 5;
                        doc.text(`Doctor: ${prescription.doctorName}`, 25, yPos);
                        yPos += 5;
                        doc.text(`Start Date: ${new Date(prescription.startDate).toLocaleDateString()}`, 25, yPos);
                        yPos += 5;

                        if (prescription.endDate) {
                            doc.text(`End Date: ${new Date(prescription.endDate).toLocaleDateString()}`, 25, yPos);
                            yPos += 5;
                        }

                        doc.text(`Refills Remaining: ${prescription.refills}`, 25, yPos);
                        yPos += 5;

                        if (prescription.notes) {
                            doc.text(`Notes: ${prescription.notes}`, 25, yPos);
                            yPos += 5;
                        }

                        // Add some space after each prescription
                        yPos += 8;
                    }
                });
            } else {
                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text("No active prescriptions found.", 25, yPos);
            }

            // Add a footer
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.text(`HealthSync - Page ${i} of ${pageCount}`, 20, 285);
            }

            // Save the PDF
            doc.save("Prescriptions_Schedule.pdf");

            // Show a toast notification
            toast.success("Prescription schedule downloaded successfully", {
                description: "Your PDF has been generated and downloaded.",
                duration: 3000,
            });
        }).catch(error => {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate prescription PDF", {
                description: "Please try again later.",
                duration: 3000,
            });
        });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <Toaster />
            <div className="flex flex-1">
                <div className="sticky top-16 h-[95%] bg-green-200">
                    <Sidebar />
                </div>
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
                                <CardTitle>Weekly Medication Schedule</CardTitle>
                                <CardDescription>Your weekly medication schedule by time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {DAYS_OF_WEEK.map(day => (
                                        <div key={day} className="grid grid-cols-[100px_1fr] gap-2">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium">{day}</span>
                                            </div>
                                            <div>
                                                {getMedicationsByDay(day).length > 0 ? (
                                                    <div className=" flex  item-center justify-start space-y-2 gap-2">
                                                        {getMedicationsByDay(day).map(med => (
                                                            <div
                                                                key={med.id}
                                                                className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 rounded-lg p-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors  w-[220px] h-20"
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <h4 className="font-medium">{med.name}</h4>
                                                                        <p className="text-xs text-muted-foreground">{med.dosage} - {med.frequency}</p>
                                                                    </div>
                                                                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full px-2 py-1">
                                                                        {med.when}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="border border-dashed rounded-lg p-4 text-center text-muted-foreground">
                                                        No medications scheduled
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Today's Medications</CardTitle>
                                    <CardDescription>Medications for {today.toLocaleDateString()}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {getTodaysMedications().length > 0 ? (
                                    <div className="space-y-2">
                                        {getTodaysMedications().map(med => (
                                            <div
                                                key={med.id}
                                                className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 rounded-lg p-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-medium">{med.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{med.dosage} - {med.frequency}</p>
                                                    </div>
                                                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full px-2 py-1">
                                                        {med.when}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="border border-dashed rounded-lg p-8 text-center">
                                        <p className="text-muted-foreground mb-4">
                                            No medications scheduled for today
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Try adding prescriptions or checking your active prescriptions
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
                            <TabsTrigger value="past">Past Prescriptions</TabsTrigger>
                            <TabsTrigger value="all">All Prescriptions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active" className="mt-6">
                            <Prescriptions
                                prescriptions={userData?.prescriptions?.filter(p => {
                                    if (!p.endDate) return true
                                    return new Date(p.endDate) >= today
                                }) as any}
                            />
                        </TabsContent>

                        <TabsContent value="past" className="mt-6">
                            <Prescriptions
                                prescriptions={userData?.prescriptions?.filter(p => {
                                    if (!p.endDate) return false
                                    return new Date(p.endDate) < today
                                }) as any}
                            />
                        </TabsContent>

                        <TabsContent value="all" className="mt-6">
                            <Prescriptions prescriptions={userData?.prescriptions as any} />
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline" onClick={handlePrintPrescriptions}>Print Prescriptions</Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PrescriptionsPage; 