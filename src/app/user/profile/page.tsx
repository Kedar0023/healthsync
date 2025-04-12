"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";

// Define the section types for edit mode
type EditSection = 'profile' | 'personal' | 'address' | 'medical';

const Profile = () => {
	// Mock user data - replace with actual data from your backend
	const [userData] = useState({
		personal: {
			name: "Jack Adams",
			firstName: "Jack",
			lastName: "Adams",
			email: "jackadams@gmail.com",
			phone: "(310) 555-1234",
			dob: "1985-04-23",
			bloodType: "O+",
			title: "Product Designer",
			location: "Los Angeles, California, USA"
		},
		medical: [
			{
				condition: "Hypertension",
				diagnosisDate: "2018-03-15",
				status: "Managed",
			},
			{
				condition: "Type 2 Diabetes",
				diagnosisDate: "2020-07-01",
				status: "Active",
			},
		],
		address: {
			country: "United States of America",
			city: "Los Angeles",
			street: "123 Health St.",
			zipCode: "90210",
			current: "123 Health St., Los Angeles, CA 90210",
			previous: "456 Care Ave., Medtown, MC 7890",
		},
		hospitalHistory: [
			{
				hospital: "City General",
				date: "2023-01-15",
				reason: "Annual Checkup",
			},
			{
				hospital: "Metro Health",
				date: "2022-08-22",
				reason: "Emergency Care",
			},
		],
	});

	// State for edit mode
	const [editMode, setEditMode] = useState({
		profile: false,
		personal: false,
		address: false,
		medical: false,
	});

	const toggleEditMode = (section: EditSection) => {
		setEditMode(prev => ({
			...prev,
			[section]: !prev[section]
		}));
	};

	return (
		<>
			<Navbar />
			<div className="flex min-h-screen bg-background">
				{/* Sidebar Navigation */}
				<div className="w-64 bg-card border-r border-border hidden md:block">
					<div className="p-6">
						<h2 className="text-xl font-bold text-primary">Users</h2>
					</div>
					<nav className="mt-6">
						<div className="px-4">
							<ul className="space-y-1">
								<li className="bg-primary/10 text-primary rounded">
									<a href="#" className="block px-4 py-2 font-medium">
										My Profile
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Security
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Teams
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Team Members
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Notifications
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Billing
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Data Export
									</a>
								</li>
								<li>
									<a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-accent/50">
										Delete Account
									</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-8">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold">Users</h1>
						<Button className="bg-primary hover:bg-primary/90">+ Add users</Button>
					</div>

					{/* Profile Header */}
					<Card className="mb-6">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-medium">My Profile</h2>
							</div>
							<div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
								<div className="relative">
									<div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
										<Image
											src="/profile-placeholder.jpg"
											alt="Profile"
											width={96}
											height={96}
											className="object-cover"
										/>
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold">{userData.personal.name}</h3>
									<p className="text-foreground">{userData.personal.title}</p>
									<p className="text-muted-foreground text-sm">{userData.personal.location}</p>
								</div>
								<div className="ml-auto">
									<Button
										variant="outline"
										size="sm"
										className="flex items-center gap-1"
										onClick={() => toggleEditMode('profile')}
									>
										<Edit2 size={16} /> Edit
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Personal Information */}
					<Card className="mb-6">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle>Personal Information</CardTitle>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1"
								onClick={() => toggleEditMode('personal')}
							>
								<Edit2 size={16} /> Edit
							</Button>
						</CardHeader>
						<CardContent className="p-6">
							{editMode.personal ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<Label htmlFor="firstName" className="text-muted-foreground text-sm">First Name</Label>
										<Input
											id="firstName"
											defaultValue={userData.personal.firstName}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="lastName" className="text-muted-foreground text-sm">Last Name</Label>
										<Input
											id="lastName"
											defaultValue={userData.personal.lastName}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="email" className="text-muted-foreground text-sm">Email address</Label>
										<Input
											id="email"
											defaultValue={userData.personal.email}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="phone" className="text-muted-foreground text-sm">Phone</Label>
										<Input
											id="phone"
											defaultValue={userData.personal.phone}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="title" className="text-muted-foreground text-sm">Job</Label>
										<Input
											id="title"
											defaultValue={userData.personal.title}
											className="mt-1"
										/>
									</div>
									<div className="md:col-span-2 mt-4 flex justify-end gap-2">
										<Button variant="outline" onClick={() => toggleEditMode('personal')}>Cancel</Button>
										<Button>Save Changes</Button>
									</div>
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<Label className="text-muted-foreground text-sm">First Name</Label>
										<p className="font-medium">{userData.personal.firstName}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">Last Name</Label>
										<p className="font-medium">{userData.personal.lastName}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">Email address</Label>
										<p className="font-medium">{userData.personal.email}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">Phone</Label>
										<p className="font-medium">{userData.personal.phone}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">Job</Label>
										<p className="font-medium">{userData.personal.title}</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Address */}
					<Card className="mb-6">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle>Address</CardTitle>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1"
								onClick={() => toggleEditMode('address')}
							>
								<Edit2 size={16} /> Edit
							</Button>
						</CardHeader>
						<CardContent className="p-6">
							{editMode.address ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<Label htmlFor="country" className="text-muted-foreground text-sm">Country</Label>
										<Input
											id="country"
											defaultValue={userData.address.country}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="city" className="text-muted-foreground text-sm">City/State</Label>
										<Input
											id="city"
											defaultValue={userData.address.city}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="zipCode" className="text-muted-foreground text-sm">Postal Code</Label>
										<Input
											id="zipCode"
											defaultValue={userData.address.zipCode}
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="id" className="text-muted-foreground text-sm">ID</Label>
										<Input
											id="id"
											defaultValue="453AER7889"
											className="mt-1"
										/>
									</div>
									<div className="md:col-span-2 mt-4 flex justify-end gap-2">
										<Button variant="outline" onClick={() => toggleEditMode('address')}>Cancel</Button>
										<Button>Save Changes</Button>
									</div>
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<Label className="text-muted-foreground text-sm">Country</Label>
										<p className="font-medium">{userData.address.country}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">City/State</Label>
										<p className="font-medium">{userData.address.city}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">Postal Code</Label>
										<p className="font-medium">{userData.address.zipCode}</p>
									</div>
									<div>
										<Label className="text-muted-foreground text-sm">ID</Label>
										<p className="font-medium">453AER7889</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Medical History - Keep this section for health app context */}
					<Card className="mb-6">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle>Medical History</CardTitle>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1"
								onClick={() => toggleEditMode('medical')}
							>
								<Edit2 size={16} /> Edit
							</Button>
						</CardHeader>
						<CardContent className="p-6">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Condition</TableHead>
										<TableHead>Diagnosis Date</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{userData.medical.map((record, index) => (
										<TableRow key={index}>
											<TableCell>{record.condition}</TableCell>
											<TableCell>{record.diagnosisDate}</TableCell>
											<TableCell>{record.status}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							{editMode.medical && (
								<div className="mt-4 flex justify-end gap-2">
									<Button variant="outline" onClick={() => toggleEditMode('medical')}>Cancel</Button>
									<Button>Save Changes</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default Profile;
