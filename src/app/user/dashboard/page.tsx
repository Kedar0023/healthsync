"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/layout/navbar";
import { AddAppointmentDialog } from "@/components/dialogs/AddAppointmentDialog";
import { AddMedicalRecordDialog } from "@/components/dialogs/AddMedicalRecordDialog";
import { AddPrescriptionDialog } from "@/components/dialogs/AddPrescriptionDialog";
import { UpdateHealthProfileDialog } from "@/components/dialogs/UpdateHealthProfileDialog";
import { AddHealthConditionDialog } from "@/components/dialogs/AddHealthConditionDialog";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { calculateAge } from "@/lib/utils";

// Define types for our data
interface Appointment {
	id: string;
	doctorName: string;
	date: string;
	time: string;
}

interface MedicalRecord {
	id: string;
	title: string;
	recordType: string;
	date: string;
}

interface Prescription {
	id: string;
	medication: string;
	dosage: string;
	frequency: string;
}

interface Allergy {
	id: string;
	name: string;
	type: string;
	severity: string | null;
	reaction: string | null;
}

interface ChronicCondition {
	id: string;
	condition: string;
	severity: string | null;
	diagnosisDate: string | null;
}

interface CurrentMedication {
	id: string;
	name: string;
	dosage: string;
	frequency: string;
}

const Dashboard: React.FC = () => {
	const router = useRouter();
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

	// Function to handle insurance update
	const handleInsuranceUpdate = () => {
		setIsLoading(true);
		toast.loading("Redirecting to insurance page...");
		setTimeout(() => {
			toast.dismiss();
			router.push('/user/insurance');
			setIsLoading(false);
		}, 1000);
	};

	if (sessionLoading || userLoading || allergiesLoading || conditionsLoading || medicationsLoading) {
		return (
			<div className="container mx-auto px-4">
				<Navbar />
				<div className="flex justify-center items-center h-screen">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
				</div>
			</div>
		);
	}

	// QR code data would be a URL or encoded data in a real app
	const qrCodeData = userData ? JSON.stringify({
		id: userData.id,
		name: userData.name,
	}) : JSON.stringify({ message: "No information available" });

	// Calculate age if date of birth is available
	const age = userData?.dateOfBirth ? calculateAge(new Date(userData.dateOfBirth)) : null;

	return (
		<div className="container mx-auto px-4">
			<Navbar />
			<h1 className="text-3xl font-bold mb-8">Your Health Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Health Card</CardTitle>
						<CardDescription>Your digital health card</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center">
							<div className="bg-white p-4 rounded-lg mb-4">
								<QRCodeSVG value={qrCodeData} size={180} />
							</div>
							<p className="text-sm text-center text-muted-foreground">
								{userData ?
									"Scan this QR code to share your health information" :
									"QR code contains limited information"
								}
							</p>
							<Button className="mt-4 w-full" disabled={!userData}>Download Card</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2 flex justify-between">
						<div>
							<CardTitle>Health Profile</CardTitle>
							<CardDescription>Your basic health information</CardDescription>
						</div>
						<UpdateHealthProfileDialog userData={userData} />
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Name:</span>
								<span className="font-medium">{userData?.name || "Not specified"}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Email:</span>
								<span className="font-medium">{userData?.email || "Not specified"}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Phone:</span>
								<span className="font-medium">{userData?.phone || "Not specified"}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Date of Birth:</span>
								<span className="font-medium">
									{userData?.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : "Not specified"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Age:</span>
								<span className="font-medium">{age || "Not specified"}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Gender:</span>
								<span className="font-medium">{userData?.gender || "Not specified"}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Blood Type:</span>
								<span className="font-medium">{userData?.bloodGroup || "Not specified"}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2 flex justify-between">
						<div>
							<CardTitle>Medical Conditions</CardTitle>
							<CardDescription>Your allergies and conditions</CardDescription>
						</div>
						<AddHealthConditionDialog />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<h3 className="text-sm font-medium mb-2">Allergies</h3>
								{allergies && allergies.length > 0 ? (
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										{allergies.map((allergy: Allergy) => (
											<li key={allergy.id}>
												{allergy.name}
												{allergy.severity && <span> - {allergy.severity}</span>}
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm text-muted-foreground">No allergies recorded</p>
								)}
							</div>
							<div>
								<h3 className="text-sm font-medium mb-2">Chronic Conditions</h3>
								{chronicConditions && chronicConditions.length > 0 ? (
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										{chronicConditions.map((condition: ChronicCondition) => (
											<li key={condition.id}>
												{condition.condition}
												{condition.severity && <span> - {condition.severity}</span>}
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm text-muted-foreground">No chronic conditions recorded</p>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Insurance</CardTitle>
						<CardDescription>Your insurance details</CardDescription>
					</CardHeader>
					<CardContent>
						{userData?.insurances && userData.insurances.length > 0 ? (
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Provider:</span>
									<span className="font-medium">{userData.insurances[0].provider}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Policy Number:</span>
									<span className="font-medium">{userData.insurances[0].policyNumber}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Status:</span>
									<span className="font-medium text-green-500">Active</span>
								</div>
								<Button variant="outline" className="mt-4 w-full" onClick={handleInsuranceUpdate} disabled={isLoading}>
									Update Insurance Info
								</Button>
							</div>
						) : (
							<div className="text-center py-4">
								<p className="text-muted-foreground mb-4">
									No insurance information available
								</p>
								<Button onClick={handleInsuranceUpdate} disabled={isLoading}>Add Insurance</Button>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Current Medications</CardTitle>
						<CardDescription>Your ongoing medications</CardDescription>
					</CardHeader>
					<CardContent>
						{currentMedications && currentMedications.length > 0 ? (
							<div className="space-y-2">
								{currentMedications.map((medication: CurrentMedication) => (
									<div key={medication.id} className="border rounded-lg p-3">
										<div className="flex justify-between">
											<h3 className="font-medium">{medication.name}</h3>
											<span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
												{medication.frequency}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">{medication.dosage}</p>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-4">
								<p className="text-muted-foreground mb-4">
									No current medications recorded
								</p>
								<Button>Add Medication</Button>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="appointments" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="appointments">Appointments</TabsTrigger>
					<TabsTrigger value="records">Medical Records</TabsTrigger>
					<TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
				</TabsList>

				<TabsContent value="appointments" className="mt-6">
					<Card>
						<CardHeader className="flex justify-between">
							<div>
								<CardTitle>Upcoming Appointments</CardTitle>
								<CardDescription>Your scheduled healthcare appointments</CardDescription>
							</div>
							<AddAppointmentDialog />
						</CardHeader>
						<CardContent>
							{userData?.appointments?.length ? (
								<div className="space-y-4">
									{userData.appointments.map((appointment: Appointment) => (
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
				</TabsContent>

				<TabsContent value="records" className="mt-6">
					<Card>
						<CardHeader className="flex justify-between">
							<div>
								<CardTitle>Medical Records</CardTitle>
								<CardDescription>Your medical history and records</CardDescription>
							</div>
							<AddMedicalRecordDialog />
						</CardHeader>
						<CardContent>
							{userData?.medicalRecords?.length ? (
								<div className="space-y-4">
									{userData.medicalRecords.map((record: MedicalRecord) => (
										<div key={record.id} className="border rounded-lg p-4">
											<div className="flex justify-between items-center">
												<div>
													<h3 className="font-medium">{record.title}</h3>
													<p className="text-sm text-muted-foreground">
														{record.recordType} - {new Date(record.date).toLocaleDateString()}
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
										You haven't added any medical records yet
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="prescriptions" className="mt-6">
					<Card>
						<CardHeader className="flex justify-between">
							<div>
								<CardTitle>Prescriptions</CardTitle>
								<CardDescription>Your current and past prescriptions</CardDescription>
							</div>
							<AddPrescriptionDialog />
						</CardHeader>
						<CardContent>
							{userData?.prescriptions?.length ? (
								<div className="space-y-4">
									{userData.prescriptions.map((prescription: Prescription) => (
										<div key={prescription.id} className="border rounded-lg p-4">
											<div className="flex justify-between items-center">
												<div>
													<h3 className="font-medium">{prescription.medication}</h3>
													<p className="text-sm text-muted-foreground">
														{prescription.dosage} - {prescription.frequency}
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
										You haven't added any prescriptions yet
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Dashboard;
