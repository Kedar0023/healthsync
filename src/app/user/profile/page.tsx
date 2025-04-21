"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BadgeCheck, LogOut, KeyRound, Trash2, Phone, Mail, Calendar } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { auth } from "@/lib/auth";
import { trpc } from "@/tRPC/client/client";

interface UserData {
	name: string | null;
	email: string | null;
	phone: string | null;
	image: string | null;
	createdAt: string | null;
}

const Profile =  () => {
	// Get session data
	const s =  trpc.getSession.useQuery()
	const session = s?.data

	if (!session?.user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	const userData: UserData = {
		name: session.user.name || null,
		email: session.user.email || null,
		phone: null,
		image: session.user.image || '/profile-placeholder.jpg',
		createdAt: session.user.createdAt || null
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) return;

		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.success && data.url) {
				window.location.reload();
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="flex">
				<Sidebar />
				<div className="flex-1 p-8">
					{/* Profile Card */}
					<Card className="mb-6">
						<CardContent className="p-6">
							<div className="flex flex-col md:flex-row items-start gap-8">
								<div className="relative group">
									<div className="h-32 w-32 rounded-full overflow-hidden bg-muted">
										<Image
											src={userData.image || '/profile-placeholder.jpg'}
											alt="Profile"
											width={128}
											height={128}
											className="object-cover w-full h-full"
										/>
										<div className="absolute inset-0  rounded-full bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
											<label htmlFor="profile-image" className="cursor-pointer">
												<Upload className="h-6 w-6 text-muted-foreground" />
												<input
													type="file"
													id="profile-image"
													className="hidden"
													accept="image/*"
													onChange={handleImageUpload}
												/>
											</label>
										</div>
									</div>
								</div>
								<div className="flex-1 space-y-4">
									<div className="flex items-center gap-2">
										<h3 className="text-2xl font-semibold">{userData.name}</h3>
										<BadgeCheck className="h-6 w-6 text-blue-500" />
									</div>
									<div className="space-y-2">
										<div className="flex items-center gap-2 text-muted-foreground">
											<Mail className="h-4 w-4" />
											<span>{userData.email}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Phone className="h-4 w-4" />
											<span>{userData.phone || 'Add phone number'}</span>
										</div>
									</div>
									{userData.createdAt && (
										<p className="text-sm text-muted-foreground">
											Member since {new Date(userData.createdAt).toLocaleDateString()}
										</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Grid Layout for Account Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Account Management Card */}
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>Account Management</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
										<div className="flex items-center gap-3">
											<LogOut className="h-5 w-5 text-gray-500" />
											<div>
												<p className="font-medium">Logout</p>
												<p className="text-sm text-muted-foreground">Sign out of your account</p>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
										<div className="flex items-center gap-3">
											<KeyRound className="h-5 w-5 text-gray-500" />
											<div>
												<p className="font-medium">Reset Password</p>
												<p className="text-sm text-muted-foreground">Change your password</p>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between p-3 bg-muted rounded-lg  transition-colors cursor-pointer">
										<div className="flex items-center gap-3">
											<Trash2 className="h-5 w-5 text-red-500" />
											<div>
												<p className="font-medium text-red-600">Delete Account</p>
												<p className="text-sm text-red-600/70">Permanently delete your account</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Activity & Bills Card */}
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{/* Appointments Section */}
									<div>
										<h4 className="font-medium mb-3 flex items-center gap-2">
											<Calendar className="h-4 w-4" />
											Last Appointment
										</h4>
										<div className="bg-muted p-3 rounded-lg">
											<p className="font-medium">Dr. Sarah Wilson</p>
											<p className="text-sm text-muted-foreground">General Checkup</p>
											<p className="text-sm text-muted-foreground mt-1">
												{new Date().toLocaleDateString()} at 10:00 AM
											</p>
										</div>
									</div>

									{/* Bills Section */}
									<div>
										<h4 className="font-medium mb-3">Recent Bills</h4>
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<div>
													<p className="font-medium">Consultation Fee</p>
													<p className="text-sm text-muted-foreground">Last payment: {new Date().toLocaleDateString()}</p>
												</div>
												<Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100">
													Paid
												</Button>
											</div>
											<div className="flex justify-between items-center">
												<div>
													<p className="font-medium">Lab Tests</p>
													<p className="text-sm text-muted-foreground">Due: {new Date().toLocaleDateString()}</p>
												</div>
												<Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100">
													Pending
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
