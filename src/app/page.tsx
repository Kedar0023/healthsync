"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
	"📤 Share data via Link or QR Code",
	"🤖 AI Chatbot for Healthcare",
	"💳 Insurance Support",
	"📅 AI-powered Appointment Booking",
	"🗂️ Quick Access to Medical Records",
];

export default function Home() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-8">
			<ModeToggle/>

			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-4xl md:text-6xl font-bold text-center mb-6"
			>
				HealthSync 🩺
			</motion.h1>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.6 }}
				className="text-lg md:text-xl text-center mb-8 max-w-2xl"
			>
				Your personal health hub – secure, smart, and seamless.
			</motion.p>

			<motion.div
				className="grid md:grid-cols-2 gap-4 max-w-4xl w-full mb-10"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.2,
						},
					},
				}}
			>
				{features.map((feature, i) => (
					<motion.div
						key={i}
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
					>
						<Card className="rounded-2xl shadow-md">
							<CardContent className="p-6 text-lg font-medium">
								{feature}
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
			>
				<Link className="text-lg px-6 py-4 rounded-xl bg-blue-400 text-zinc-950" href={"/user/dashboard"}>Get Started</Link>
			</motion.div>
		</main>
	);
}
