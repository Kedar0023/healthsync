"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { HeartPulse, ClipboardList, Calendar, LogOut } from "lucide-react";

const MotionCard = motion(Card);

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Header */}
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">👩‍⚕️ Dashboard</h1>
				<Button variant="outline" className="flex items-center gap-2">
					<LogOut className="w-4 h-4" /> Logout
				</Button>
			</header>

			{/* Tabs */}
			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid grid-cols-3 w-full mb-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="records">Records</TabsTrigger>
					<TabsTrigger value="appointments">Appointments</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value="overview">
					<div className="grid md:grid-cols-3 gap-4">
						<MotionCard whileHover={{ scale: 1.03 }} className="p-4">
							<CardContent className="flex flex-col gap-2">
								<HeartPulse className="text-blue-500 w-6 h-6" />
								<h3 className="font-semibold">Vital Stats</h3>
								<Progress value={75} />
								<p className="text-sm text-gray-500">
									Heart health is on track
								</p>
							</CardContent>
						</MotionCard>

						<MotionCard whileHover={{ scale: 1.03 }} className="p-4">
							<CardContent className="flex flex-col gap-2">
								<ClipboardList className="text-green-500 w-6 h-6" />
								<h3 className="font-semibold">Medications</h3>
								<p className="text-sm text-gray-500">3 active prescriptions</p>
							</CardContent>
						</MotionCard>

						<MotionCard whileHover={{ scale: 1.03 }} className="p-4">
							<CardContent className="flex flex-col gap-2">
								<Calendar className="text-purple-500 w-6 h-6" />
								<h3 className="font-semibold">Next Appointment</h3>
								<p className="text-sm text-gray-500">
									April 15th, 2025 - 10:00 AM
								</p>
							</CardContent>
						</MotionCard>
					</div>
				</TabsContent>

				{/* Records Tab */}
				<TabsContent value="records">
					<div className="bg-white p-4 rounded-md shadow-sm">
						<h3 className="font-semibold mb-2">Recent Health Logs</h3>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>✔️ Blood Pressure - 120/80</li>
							<li>✔️ Glucose Level - Normal</li>
							<li>✔️ Weight - 68kg</li>
						</ul>
					</div>
				</TabsContent>

				{/* Appointments Tab */}
				<TabsContent value="appointments">
					<div className="bg-white p-4 rounded-md shadow-sm">
						<h3 className="font-semibold mb-2">Upcoming Appointments</h3>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>🗓️ Dr. Smith - April 15th @ 10:00AM</li>
							<li>🗓️ Dr. Rose - April 20th @ 1:30PM</li>
						</ul>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
