// app/page.tsx
"use client"
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Bot, QrCode, CalendarCheck, ClipboardList, FileSearch, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Home() {
	const features = [
		{
			icon: <Bot className="w-8 h-8 text-blue-600" />,
			title: "AI Health Assistant",
			description: "Get instant answers to your health questions with our 24/7 AI chatbot that understands medical terminology.",
		},
		{
			icon: <QrCode className="w-8 h-8 text-teal-500" />,
			title: "QR Code Sharing",
			description: "Securely share your medical records with healthcare providers via encrypted QR codes with one tap.",
		},
		{
			icon: <ClipboardList className="w-8 h-8 text-purple-600" />,
			title: "Prescription Management",
			description: "Digitize, organize, and track all your prescriptions with refill reminders and dosage alerts.",
		},
		{
			icon: <CalendarCheck className="w-8 h-8 text-amber-500" />,
			title: "Appointment Scheduling",
			description: "Book, reschedule, or cancel appointments with your doctors and receive timely reminders.",
		},
		{
			icon: <FileSearch className="w-8 h-8 text-red-500" />,
			title: "Medical History Tracking",
			description: "Maintain a complete timeline of your health records, test results, and doctor visits in one place.",
		},
		{
			icon: <HeartPulse className="w-8 h-8 text-green-500" />,
			title: "Health Monitoring",
			description: "Track vital signs, symptoms, and health metrics with personalized insights and trends.",
		},
	];

	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative w-full pt-20 pb-24 overflow-hidden">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-8 text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
								Revolutionizing Healthcare
							</span>
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent"
						>

							HealthSync
						</motion.h1>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent"
						>
							Your Complete Health Companion
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
						>
							Seamlessly manage your health records, appointments, prescriptions, and more with our
							AI-powered healthcare platform.
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="flex flex-col gap-4 sm:flex-row"
						>
							<Link
								href="/user/dashboard"
								className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
							>
								Get Started <ArrowRight className="w-4 h-4" />
							</Link>
							<Button variant="outline" className="gap-2">
								Learn More
							</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="grid grid-cols-3 gap-4 mt-12"
						>
							<div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
								<Stethoscope className="w-8 h-8 mx-auto text-blue-600" />
								<p className="mt-2 text-sm font-medium">Doctor Consultations</p>
							</div>
							<div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
								<Bot className="w-8 h-8 mx-auto text-teal-500" />
								<p className="mt-2 text-sm font-medium">AI Assistant</p>
							</div>
							<div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
								<QrCode className="w-8 h-8 mx-auto text-purple-600" />
								<p className="mt-2 text-sm font-medium">QR Sharing</p>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-teal-50/30 dark:from-blue-900/10 dark:to-teal-900/10"></div>
					<div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
					<div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-gray-50 dark:bg-gray-900">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-6 text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
						>
							<span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
								Features
							</span>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
						>
							Comprehensive Healthcare Solutions
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
						>
							Everything you need to take control of your health journey in one intuitive platform.
						</motion.p>
					</div>
					<div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
							>
								<div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20">
									{feature.icon}
								</div>
								<h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
								<p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-gray-300 py-12">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
						>
							<h3 className="text-xl font-semibold text-white mb-4">HealthConnect</h3>
							<p className="text-gray-400">
								Empowering you with tools to manage your health journey with confidence and ease.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h4 className="text-lg font-medium text-white mb-4">Features</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										AI Health Assistant
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Medical Records
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Prescription Management
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Appointment Scheduling
									</a>
								</li>
							</ul>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<h4 className="text-lg font-medium text-white mb-4">Company</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										About Us
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Careers
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Privacy Policy
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Terms of Service
									</a>
								</li>
							</ul>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<h4 className="text-lg font-medium text-white mb-4">Connect With Us</h4>
							<div className="flex space-x-4">
								<a href="#" className="text-gray-400 hover:text-white transition-colors">
									{/* <Facebook className="w-5 h-5" /> */}
								</a>
								<a href="#" className="text-gray-400 hover:text-white transition-colors">
									{/* <Twitter className="w-5 h-5" /> */}
								</a>
								<a href="#" className="text-gray-400 hover:text-white transition-colors">
									{/* <Instagram className="w-5 h-5" /> */}
								</a>
								<a href="#" className="text-gray-400 hover:text-white transition-colors">
									{/* <Linkedin className="w-5 h-5" /> */}
								</a>
							</div>
							<div className="mt-6">
								<p className="text-sm text-gray-400">
									Subscribe to our newsletter for updates
								</p>
								<div className="flex mt-2">
									<input
										type="email"
										placeholder="Your email"
										className="px-3 py-2 text-sm bg-gray-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
									/>
									<button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors">
										Subscribe
									</button>
								</div>
							</div>
						</motion.div>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						viewport={{ once: true }}
						className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
					>
						<p>© {new Date().getFullYear()} HealthConnect. All rights reserved.</p>
					</motion.div>
				</div>
			</footer>
		</div>
	);
}