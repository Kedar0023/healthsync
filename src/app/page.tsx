"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

  const LandingPage =()=> {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#e0f7fa] text-gray-800">
			{/* Hero Section */}
			<section className="text-center py-24 px-6 max-w-5xl mx-auto">
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-5xl font-bold mb-6"
				>
					Smarter Healthcare Starts Here 🏥
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="text-lg max-w-2xl mx-auto mb-8"
				>
					Your personal AI-powered health assistant. Manage prescriptions, track medical history, and share health info with a simple QR code.
				</motion.p>
				<Button className="text-lg px-6 py-4 rounded-2xl shadow-xl">
					Get Started <ArrowRight className="ml-2 w-5 h-5" />
				</Button>
			</section>

			{/* Features Section */}
			<section className="bg-white py-20 px-6">
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
					{[
						{
							title: "AI Health Chatbot 🤖",
							desc: "Get instant answers & health guidance powered by AI."
						},
						{
							title: "QR Code Sharing 📲",
							desc: "Easily share your health data securely via QR code."
						},
						{
							title: "Prescription Manager 💊",
							desc: "Track and manage your medicines with reminders."
						},
						{
							title: "Appointment Scheduler 📅",
							desc: "Book, view, and manage doctor appointments."
						},
						{
							title: "Medical History Tracker 📚",
							desc: "Keep your health records organized in one place."
						},
						{
							title: "Secure & Private 🔒",
							desc: "Your data stays safe with top-level encryption."
						},
					].map((feature, idx) => (
						<Card key={idx} className="rounded-2xl shadow-md hover:shadow-xl transition duration-300">
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
								<p className="text-gray-600 text-sm">{feature.desc}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-[#def2f1] text-center py-6 text-sm">
				<p>© 2025 HealthSync. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default LandingPage
