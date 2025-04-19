"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new dashboard components
import { HealthCard } from "@/components/dashboard/health-card";
import { HealthProfile } from "@/components/dashboard/health-profile";
import { MedicalConditions } from "@/components/dashboard/medical-conditions";
import { InsuranceDisplay } from "@/components/dashboard/insurance";
import { CurrentMedications } from "@/components/dashboard/current-medications";
import { Appointments } from "@/components/dashboard/appointments";
import { MedicalRecords } from "@/components/dashboard/medical-records";
import { Prescriptions } from "@/components/dashboard/prescriptions";

const Dashboard: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	// Get session first to get user ID
	const { data: session, isLoading: sessionLoading } = trpc.getSession.useQuery();

	// Then fetch user data using the ID
	const { data: userData, isLoading: userLoading } = trpc.getUserData.useQuery(
		{ userId: session?.user.id ?? "" },
		{ enabled: !!session?.user.id }
	);

	// Fetch allergies and chronic conditions
	const { data: allergies, isLoading: allergiesLoading } = trpc.user.getAllergies.useQuery(
		undefined,
		{ enabled: !!session?.user.id }
	);

	const { data: chronicConditions, isLoading: conditionsLoading } = trpc.user.getChronicConditions.useQuery(
		undefined,
		{ enabled: !!session?.user.id }
	);

	// Fetch current medications
	const { data: currentMedications, isLoading: medicationsLoading } = trpc.user.getCurrentMedications.useQuery(
		undefined,
		{ enabled: !!session?.user.id }
	);

	// Fetch appointments directly
	const { data: appointments, isLoading: appointmentsLoading } = trpc.user.getAppointments.useQuery(
		undefined,
		{ enabled: !!session?.user.id }
	);

	if (
		sessionLoading ||
		userLoading ||
		allergiesLoading ||
		conditionsLoading ||
		medicationsLoading ||
		appointmentsLoading
	) {
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
						<h1 className="text-3xl font-bold">Your Health Dashboard</h1>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<HealthCard userData={userData} />
						<HealthProfile userData={userData} />
						<MedicalConditions allergies={allergies} chronicConditions={chronicConditions} />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<InsuranceDisplay insurances={userData?.insurances} />
						<CurrentMedications medications={currentMedications} />
					</div>

					<p className="text-2xl mx-12">Quick Actions</p>

					<Tabs defaultValue="appointments" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="appointments">Appointments</TabsTrigger>
							<TabsTrigger value="records">Medical Records</TabsTrigger>
							<TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
						</TabsList>

						<TabsContent value="appointments" className="mt-6">
							<Appointments appointments={appointments} />
						</TabsContent>

						<TabsContent value="records" className="mt-6">
							<MedicalRecords medicalRecords={userData?.medicalRecords} />
						</TabsContent>

						<TabsContent value="prescriptions" className="mt-6">
							<Prescriptions prescriptions={userData?.prescriptions} />
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
