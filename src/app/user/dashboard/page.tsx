import React from "react";
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

const Dashboard: React.FC = () => {
	// This would be replaced with actual user data
	const userData = {
		name: "John Doe",
		healthCardId: "HC-12345678",
		insuranceProvider: "HealthPlus Insurance",
		policyNumber: "POL-987654321",
		bloodType: "O+",
		allergies: ["Penicillin", "Peanuts"],
		emergencyContact: "Jane Doe (Wife) - +1 234 567 8900",
	};

	// QR code data would be a URL or encoded data in a real app
	const qrCodeData = JSON.stringify({
		id: userData.healthCardId,
		name: userData.name,
		// In a real app, you would include a secure token or link
		// rather than sensitive health information
	});

	return (
		<div className="container mx-auto px-4 ">
			<Navbar/>
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
								Scan this QR code to share your health information
							</p>
							<Button className="mt-4 w-full">Download Card</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Health Summary</CardTitle>
						<CardDescription>Your basic health information</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Blood Type:</span>
								<span className="font-medium">{userData.bloodType}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Allergies:</span>
								<span className="font-medium">
									{userData.allergies.join(", ")}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									Emergency Contact:
								</span>
								<span className="font-medium">{userData.emergencyContact}</span>
							</div>
						</div>
						<Button variant="outline" className="mt-4 w-full">
							Update Health Info
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Insurance</CardTitle>
						<CardDescription>Your insurance details</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Provider:</span>
								<span className="font-medium">
									{userData.insuranceProvider}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Policy Number:</span>
								<span className="font-medium">{userData.policyNumber}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Status:</span>
								<span className="font-medium text-green-500">Active</span>
							</div>
						</div>
						<Button variant="outline" className="mt-4 w-full">
							Update Insurance Info
						</Button>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="records" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="records">Medical Records</TabsTrigger>
					<TabsTrigger value="appointments">Appointments</TabsTrigger>
					<TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
				</TabsList>

				<TabsContent value="records" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Medical Records</CardTitle>
							<CardDescription>
								Your medical history and records
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">
								<p className="text-muted-foreground mb-4">
									You haven&apos;t added any medical records yet.
								</p>
								<Button>Add Medical Record</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="appointments" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Upcoming Appointments</CardTitle>
							<CardDescription>
								Your scheduled healthcare appointments
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">
								<p className="text-muted-foreground mb-4">
									You don&apos;t have any upcoming appointments.
								</p>
								<Button>Schedule Appointment</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="prescriptions" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Prescriptions</CardTitle>
							<CardDescription>
								Your current and past prescriptions
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">
								<p className="text-muted-foreground mb-4">
									You haven&apos;t added any prescriptions yet.
								</p>
								<Button>Add Prescription</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Dashboard;
