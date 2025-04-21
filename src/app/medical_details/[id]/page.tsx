"use client"
import { motion } from "motion/react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/tRPC/client/client";
import { useParams } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
};

export default function HealthDashboard() {
  const {id} = useParams()
	// Fetch user data using TRPC
	const { data: userData, isLoading } = trpc.getUserData.useQuery({
		userId: id as string,
	});
  console.log(userData);

	// Fetch additional data
	const { data: chronicConditions } = trpc.user.getChronicConditions.useQuery(
		undefined,
		{ enabled: !!id }
	);
	const { data: allergies } = trpc.user.getAllergies.useQuery(undefined, {
		enabled: !!id,
	});
	const { data: currentMedications } = trpc.user.getCurrentMedications.useQuery(
		undefined,
		{ enabled: !!id }
	);
	const { data: medicalRecords } = trpc.user.getMedicalRecords.useQuery(
		undefined,
		{ enabled: !!id }
	);
	const { data: prescriptions } = trpc.user.getPrescriptions.useQuery(
		undefined,
		{ enabled: !!id }
	);
	const { data: appointments } = trpc.user.getAppointments.useQuery(undefined, {
		enabled: !!id,
	});
	const { data: insurances } = trpc.user.getInsurances.useQuery(undefined, {
		enabled: !!id,
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<motion.div
			className="container mx-auto px-4 py-8"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Personal Information */}
				<motion.div variants={itemVariants} className="lg:col-span-1">
					<Card>
						<CardHeader>
							<div className="flex items-center space-x-4">
								<Avatar className="h-[200px] w-[200px]">
									<AvatarImage
										src={userData?.image || undefined}
										width={200}
										height={200}
										className="object-cover"
									/>
									<AvatarFallback>
										{userData?.name?.charAt(0) || "U"}
									</AvatarFallback>
								</Avatar>
								<div>
									<CardTitle>{userData?.name || "User"}</CardTitle>
									<CardDescription>{userData?.email}</CardDescription>
								</div>
							</div>
              <ModeToggle/>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground">
										Personal Details
									</h3>
									<div className="mt-2 space-y-1">
										<p>
											<span className="font-medium">Age:</span>{" "}
											{userData?.age || "Not specified"}
										</p>
										<p>
											<span className="font-medium">Gender:</span>{" "}
											{userData?.gender || "Not specified"}
										</p>
										<p>
											<span className="font-medium">Blood Group:</span>{" "}
											{userData?.bloodGroup || "Not specified"}
										</p>
										<p>
											<span className="font-medium">Date of Birth:</span>{" "}
											{userData?.dateOfBirth || "Not specified"}
										</p>
										<p>
											<span className="font-medium">Phone:</span>{" "}
											{userData?.phone || "Not specified"}
										</p>
									</div>
								</div>
								<Separator />
								<div>
									<h3 className="text-sm font-medium text-muted-foreground">
										Insurance
									</h3>
									{insurances?.length ? (
										<div className="mt-2 space-y-2">
											{insurances.map((insurance) => (
												<div
													key={insurance.id}
													className="p-3 border rounded-lg"
												>
													<p className="font-medium">{insurance.provider}</p>
													<p className="text-sm">
														Policy: {insurance.policyNumber}
													</p>
													<Badge
														variant={
															insurance.isActive ? "default" : "secondary"
														}
														className="mt-1"
													>
														{insurance.isActive ? "Active" : "Inactive"}
													</Badge>
												</div>
											))}
										</div>
									) : (
										<p className="text-sm text-muted-foreground mt-2">
											No insurance information
										</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Health Information */}
				<motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
					{/* Health Summary */}
					<Card>
						<CardHeader>
							<CardTitle>Health Summary</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h3 className="text-sm font-medium text-muted-foreground mb-2">
									Chronic Conditions
								</h3>
								{chronicConditions?.length ? (
									<ul className="space-y-2">
										{chronicConditions.map((condition) => (
											<li key={condition.id} className="flex items-start">
												<div className="flex-1">
													<p className="font-medium">{condition.condition}</p>
													{condition.diagnosisDate && (
														<p className="text-sm text-muted-foreground">
															Diagnosed: {condition.diagnosisDate}
														</p>
													)}
												</div>
												{condition.severity && (
													<Badge variant="outline">{condition.severity}</Badge>
												)}
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm text-muted-foreground">
										No chronic conditions recorded
									</p>
								)}
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground mb-2">
									Allergies
								</h3>
								{allergies?.length ? (
									<ul className="space-y-2">
										{allergies.map((allergy) => (
											<li key={allergy.id} className="flex items-start">
												<div className="flex-1">
													<p className="font-medium">{allergy.name}</p>
													<p className="text-sm text-muted-foreground">
														{allergy.type}
													</p>
												</div>
												{allergy.severity && (
													<Badge variant="outline">{allergy.severity}</Badge>
												)}
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm text-muted-foreground">
										No allergies recorded
									</p>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Medications */}
					<Card>
						<CardHeader>
							<CardTitle>Medications</CardTitle>
							<CardDescription>
								Current and prescribed medications
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<h3 className="text-sm font-medium text-muted-foreground mb-2">
									Current Medications
								</h3>
								{currentMedications?.length ? (
									<div className="space-y-3">
										{currentMedications.map((med) => (
											<div key={med.id} className="p-3 border rounded-lg">
												<div className="flex justify-between items-start">
													<div>
														<p className="font-medium">{med.name}</p>
														<p className="text-sm text-muted-foreground">
															{med.dosage} • {med.frequency}
														</p>
													</div>
													<Badge variant="outline">
														{med.endDate && new Date(med.endDate) > new Date()
															? "Active"
															: "Completed"}
													</Badge>
												</div>
												{med.prescribedBy && (
													<p className="text-sm mt-1">
														Prescribed by: {med.prescribedBy}
													</p>
												)}
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-muted-foreground">
										No current medications
									</p>
								)}
							</div>

							<Separator />

							<div>
								<h3 className="text-sm font-medium text-muted-foreground mb-2">
									Prescriptions
								</h3>
								{prescriptions?.length ? (
									<div className="space-y-3">
										{prescriptions.map((prescription) => (
											<div
												key={prescription.id}
												className="p-3 border rounded-lg"
											>
												<div className="flex justify-between items-start">
													<div>
														<p className="font-medium">{prescription.title}</p>
														<p className="text-sm text-muted-foreground">
															{prescription.medication.name} •{" "}
															{prescription.medication.dosage}
														</p>
													</div>
													<Badge variant="outline">{prescription.status}</Badge>
												</div>
												<div className="mt-2 text-sm">
													<p>Doctor: {prescription.doctorName}</p>
													<p>Refills: {prescription.refills} remaining</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-muted-foreground">
										No prescriptions
									</p>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Appointments */}
					<Card>
						<CardHeader>
							<CardTitle>Appointments</CardTitle>
							<CardDescription>
								Upcoming and past medical appointments
							</CardDescription>
						</CardHeader>
						<CardContent>
							{appointments?.length ? (
								<div className="space-y-3">
									{appointments.map((appointment) => (
										<div key={appointment.id} className="p-3 border rounded-lg">
											<div className="flex justify-between items-start">
												<div>
													<p className="font-medium">
														{appointment.doctorName}
													</p>
													<p className="text-sm text-muted-foreground">
														{appointment.date} at {appointment.time}
													</p>
													{appointment.hospitalName && (
														<p className="text-sm mt-1">
															Location: {appointment.hospitalName}
														</p>
													)}
												</div>
												<Badge variant="outline">{appointment.status}</Badge>
											</div>
											{appointment.notes && (
												<p className="text-sm mt-2">
													Notes: {appointment.notes}
												</p>
											)}
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No appointments scheduled
								</p>
							)}
						</CardContent>
					</Card>

					{/* Medical Records */}
					<Card>
						<CardHeader>
							<CardTitle>Medical Records</CardTitle>
						</CardHeader>
						<CardContent>
							{medicalRecords?.length ? (
								<ScrollArea className="h-64">
									<div className="space-y-3">
										{medicalRecords.map((record) => (
											<div key={record.id} className="p-3 border rounded-lg">
												<div className="flex justify-between items-start">
													<div>
														<p className="font-medium">{record.title}</p>
														<p className="text-sm text-muted-foreground">
															{record.recordType} • {record.date}
														</p>
													</div>
													{record.fileUrl && (
														<a
															href={record.fileUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="text-sm text-blue-600 hover:underline"
														>
															View Document
														</a>
													)}
												</div>
												{record.doctorName && (
													<p className="text-sm mt-1">
														Doctor: {record.doctorName}
													</p>
												)}
												{record.description && (
													<p className="text-sm mt-2">{record.description}</p>
												)}
											</div>
										))}
									</div>
								</ScrollArea>
							) : (
								<p className="text-sm text-muted-foreground">
									No medical records
								</p>
							)}
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</motion.div>
	);
}
