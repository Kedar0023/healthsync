import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Landing: React.FC = () => {

	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row items-center">
						<div className="md:w-1/2 mb-10 md:mb-0">
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Your Health Information, Digitized and Secure
							</h1>
							<p className="text-xl mb-8">
								DigiCard helps you store, manage, and share your health and
								insurance information securely with QR code technology.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="bg-white text-blue-700 hover:bg-gray-100"
								>
									Get Started
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-white text-white hover:bg-white/10"
								>
									Learn More
								</Button>
							</div>
						</div>
						<div className="md:w-1/2 flex justify-center">
							<Image
							width={500}
							height={500}
								src="/placeholder-hero.svg"
								alt="DigiCard Health Card"
								className="max-w-md w-full rounded-lg shadow-lg"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Why Choose DigiCard?
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card>
							<CardContent className="pt-6">
								<div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-blue-600"
									>
										<rect
											x="3"
											y="4"
											width="18"
											height="18"
											rx="2"
											ry="2"
										></rect>
										<line x1="16" y1="2" x2="16" y2="6"></line>
										<line x1="8" y1="2" x2="8" y2="6"></line>
										<line x1="3" y1="10" x2="21" y2="10"></line>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									All-in-One Health Card
								</h3>
								<p className="text-gray-600">
									Store all your medical information, insurance details,
									emergency contacts, and more in one secure digital card.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-blue-600"
									>
										<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
								<p className="text-gray-600">
									Your health data is encrypted and protected. You control who
									can access your information and for how long.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-blue-600"
									>
										<polyline points="6 9 6 2 18 2 18 9"></polyline>
										<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
										<rect x="6" y="14" width="12" height="8"></rect>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-2">Instant Sharing</h3>
								<p className="text-gray-600">
									Share your health information instantly with healthcare
									providers via QR code - no paperwork needed.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						How DigiCard Works
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								1
							</div>
							<h3 className="text-xl font-semibold mb-2">Sign Up</h3>
							<p className="text-gray-600">
								Create your secure DigiCard account in minutes
							</p>
						</div>

						<div className="text-center">
							<div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								2
							</div>
							<h3 className="text-xl font-semibold mb-2">Add Information</h3>
							<p className="text-gray-600">
								Enter your health and insurance details securely
							</p>
						</div>

						<div className="text-center">
							<div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								3
							</div>
							<h3 className="text-xl font-semibold mb-2">Generate Card</h3>
							<p className="text-gray-600">
								Create your digital health card with QR code
							</p>
						</div>

						<div className="text-center">
							<div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								4
							</div>
							<h3 className="text-xl font-semibold mb-2">Share Securely</h3>
							<p className="text-gray-600">
								Share with healthcare providers when needed
							</p>
						</div>
					</div>

					<div className="text-center mt-12">
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700"
						>
							Create Your DigiCard Now
						</Button>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						What Our Users Say
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center mb-4">
									<div className="rounded-full bg-gray-200 w-12 h-12 mr-4"></div>
									<div>
										<h4 className="font-semibold">Sarah Johnson</h4>
										<p className="text-sm text-gray-500">
											Healthcare Professional
										</p>
									</div>
								</div>
								<p className="text-gray-600">
									&quot;DigiCard has revolutionized how I access patient information.
									It&apos;s quick, secure, and contains all the essential details I
									need.&quot;
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center mb-4">
									<div className="rounded-full bg-gray-200 w-12 h-12 mr-4"></div>
									<div>
										<h4 className="font-semibold">Michael Chen</h4>
										<p className="text-sm text-gray-500">DigiCard User</p>
									</div>
								</div>
								<p className="text-gray-600">
									&quot;I travel frequently and DigiCard ensures I always have my
									medical information with me. The QR sharing feature has been a
									lifesaver!&quot;
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center mb-4">
									<div className="rounded-full bg-gray-200 w-12 h-12 mr-4"></div>
									<div>
										<h4 className="font-semibold">Emily Rodriguez</h4>
										<p className="text-sm text-gray-500">
											Insurance Specialist
										</p>
									</div>
								</div>
								<p className="text-gray-600">
									&quot;Processing insurance claims is much faster when patients use
									DigiCard. All the information is accurate and easily
									accessible.&quot;
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-blue-600 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to Digitize Your Health Information?
					</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Join thousands of users who trust DigiCard for secure health
						information management.
					</p>
					<Button
						size="lg"
						className="bg-white text-blue-700 hover:bg-gray-100"
					>
						Get Started for Free
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Landing;
