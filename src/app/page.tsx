"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion } from "framer-motion";
import {
	HeartPulse,
	ShieldCheck,
	Stethoscope,
	CheckCircle,
	// Handshake,
} from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

const MotionSection = motion.section;
const MotionH3 = motion.h3;

const features = [
	{
		icon: <HeartPulse className="w-6 h-6 text-blue-500" />,
		title: "Track Health",
		desc: "Monitor vitals, medications, and appointments.",
	},
	{
		icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
		title: "Data Privacy",
		desc: "We prioritize your medical data's security.",
	},
	{
		icon: <Stethoscope className="w-6 h-6 text-blue-500" />,
		title: "Expert Access",
		desc: "Connect with verified healthcare professionals.",
	},
];

const benefits = [
	"Faster access to records",
	"24/7 data availability",
	"Share data via QR or link",
	"Minimal, modern interface",
];

const carouselItems = [
	"Stay on top of your health goals",
	"Never miss an appointment again",
	"Your health, your control",
];

export default function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col bg-white text-gray-900">
			{/* Navbar */}
			<nav className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
				<h1 className="text-2xl font-bold">HealthTrack</h1>
				<Link href={"/auth/signup"}>Sign In</Link>
			</nav>

			{/* Hero with Carousel */}
			<MotionSection
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="px-6 py-20 text-center"
			>
				<h2 className="text-4xl font-bold mb-6">Your Health, Simplified 🩺</h2>
				<Carousel>
					<CarouselContent className="flex justify-center items-center">
						{carouselItems.map((text, i) => (
							<CarouselItem key={i} className="text-lg text-gray-600">
								{text}
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
				<Button size="lg" className="mt-6">
					Get Started
				</Button>
			</MotionSection>

			{/* Features with HoverCard */}
			<section className="grid md:grid-cols-3 gap-6 px-6 py-16 bg-gray-50">
				{features.map((f, i) => (
					<HoverCard key={i}>
						<HoverCardTrigger asChild>
							<Card className="shadow-sm cursor-pointer hover:scale-105 transition-transform">
								<CardContent className="flex flex-col items-center gap-4 p-6">
									{f.icon}
									<h3 className="text-xl font-semibold">{f.title}</h3>
									<p className="text-gray-600 text-center">{f.desc}</p>
								</CardContent>
							</Card>
						</HoverCardTrigger>
						<HoverCardContent className="text-sm text-gray-600">
							Learn more about {f.title.toLowerCase()} and how it empowers your
							healthcare experience.
						</HoverCardContent>
					</HoverCard>
				))}
			</section>

			{/* Reinforcing Statements */}
			<section className="px-6 py-16 text-center">
				<MotionH3
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="text-3xl font-bold mb-4"
				>
					Trusted by patients & professionals alike 🧑‍⚕️
				</MotionH3>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Designed with privacy-first architecture and healthcare-grade
					standards.
				</p>
			</section>

			{/* Benefits */}
			<section className="px-6 py-16 bg-blue-50">
				<h3 className="text-2xl font-bold text-center mb-6">
					Why Choose HealthTrack?
				</h3>
				<div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
					{benefits.map((b, i) => (
						<motion.div
							key={i}
							whileHover={{ scale: 1.05 }}
							className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm"
						>
							<CheckCircle className="text-green-500" />
							<span>{b}</span>
						</motion.div>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer className="px-6 py-8 bg-gray-100 text-center text-sm text-gray-500">
				<p>&copy; 2025 HealthTrack. All rights reserved.</p>
			</footer>
		</div>
	);
}
