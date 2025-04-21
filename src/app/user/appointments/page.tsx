"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { trpc } from "@/tRPC/client/client";
import { Appointments } from "@/components/dashboard/appointments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";

type aptdata = {
	doctorName: string;
	hospitalName?: string;
	date: string;
	time: string;
	type: string;
	notes?: string;
};

const AppointmentsPage: React.FC = () => {
	const [aiDialogOpen, setAiDialogOpen] = useState(false);
	const [aiPrompt, setAiPrompt] = useState("");
	const [aiCreating, setAiCreating] = useState(false);
	const [aiError, setAiError] = useState("");

	// Get session first to get user ID
	const { data: session, isLoading: sessionLoading } =
		trpc.getSession.useQuery();

	// Then fetch user data using the ID
	const { data: userData, isLoading: userLoading } = trpc.getUserData.useQuery(
		{ userId: session?.user.id ?? "" },
		{ enabled: !!session?.user.id }
	);

	const generateWithAI = trpc.AI.generateAppointmentSuggestion.useMutation();
	const addAppointment = trpc.user.addAppointment.useMutation();

	const handleCreateWithAI = async () => {
		setAiError("");
		setAiCreating(true);
		try {
			const aiText: aptdata = await generateWithAI.mutateAsync({
				prompt: aiPrompt,
			});

			const { doctorName, hospitalName, date, time, type, notes } = aiText;

			await addAppointment.mutateAsync({
				doctorName,
				hospitalName,
				date,
				time,
				type,
				notes,
			});
			setAiDialogOpen(false);
			setAiPrompt("");
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			setAiError("Failed to create appointment with AI.");
		} finally {
			setAiCreating(false);
		}
	};

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
						<p className="text-muted-foreground mt-2">
							Manage your healthcare appointments
						</p>
						<Button className="mt-4" onClick={() => setAiDialogOpen(true)}>
							Create with AI
						</Button>
					</div>

					<div className="space-y-6">
						<div className="grid grid-cols-1 gap-4">
							<div>
								<h2 className="text-xl font-semibold mb-4">Today</h2>
								<div className="bg-muted/50 rounded-lg p-4 min-h-[150px] flex items-start justify-start">
									{userData?.appointments?.some(
										(apt) =>
											new Date(apt.date).toDateString() ===
											new Date().toDateString()
									) ? (
										userData.appointments
											.filter(
												(apt) =>
													new Date(apt.date).toDateString() ===
													new Date().toDateString()
											)
											.map((appointment) => (
												<div
													key={appointment.id}
													className="border rounded-lg p-4 hover:opacity-50 w-full"
												>
													<div className="flex justify-between items-center">
														<div>
															<h3 className="font-medium">
																{appointment.doctorName}
															</h3>
															<p className="text-sm text-muted-foreground">
																{formatDate(appointment.date)} at{" "}
																{appointment.time}
															</p>
															<p className="text-xs text-muted-foreground mt-1">
																Type: {appointment.type}
															</p>
														</div>
													</div>
												</div>
											))
									) : (
										<p className="text-muted-foreground text-sm">
											No appointments for today 😌
										</p>
									)}
								</div>
							</div>

							<div>
								<h2 className="text-xl font-semibold mb-4">Upcoming</h2>
								<Appointments
									appointments={userData?.appointments?.filter(
										(apt) =>
											new Date(apt.date) > new Date() &&
											new Date(apt.date).toDateString() !==
												new Date().toDateString()
									)}
								/>
							</div>
						</div>
					</div>
				</main>
			</div>
			<Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Appointment with AI</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<Textarea
							value={aiPrompt}
							onChange={(e) => setAiPrompt(e.target.value)}
							placeholder="Describe your needs or appointment details..."
							className="w-full"
							disabled={aiCreating}
						/>
						{aiError && <div className="text-red-500 text-sm">{aiError}</div>}
					</div>
					<DialogFooter>
						<Button
							onClick={handleCreateWithAI}
							disabled={aiCreating || !aiPrompt}
						>
							{aiCreating ? "Creating..." : "Create Appointment"}
						</Button>
						<Button
							variant="secondary"
							onClick={() => setAiDialogOpen(false)}
							disabled={aiCreating}
						>
							Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AppointmentsPage;
