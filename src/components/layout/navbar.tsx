"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// This would come from your auth state in a real app
	const isLoggedIn = true;

	return (
		<header className="bg-background border-b sticky top-0 z-50 shadow-sm">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				<Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-8 h-8"
					>
						<path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
					</svg>
					HealthSync
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6">
					<Link href="/" className="text-foreground hover:text-primary transition-colors">
						Home
					</Link>
					<Link href="/about" className="text-foreground hover:text-primary transition-colors">
						About
					</Link>
					<Link href="/user/dashboard" className="text-foreground hover:text-primary transition-colors">
						Dashboard
					</Link>
				</nav>

				{/* User menu or Auth buttons */}
				<div className="hidden md:flex items-center space-x-4">
					{isLoggedIn ? (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="flex items-center gap-2 p-1">
										<Avatar className="h-8 w-8">
											<AvatarImage src="/profile-placeholder.jpg" alt="User" />
											<AvatarFallback>JA</AvatarFallback>
										</Avatar>
										<span className="font-medium">Jack Adams</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem asChild>
										<Link href="/user/profile">Profile</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/user/dashboard">Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/settings">Settings</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<ModeToggle />
						</>
					) : (
						<>
							<Button variant="ghost" asChild>
								<Link href="/login">Login</Link>
							</Button>
							<Button asChild>
								<Link href="/auth/signup">Sign Up</Link>
							</Button>
							<ModeToggle />
						</>
					)}
				</div>

				{/* Mobile menu button */}
				<div className="md:hidden flex items-center gap-2">
					<ModeToggle />
					<button
						className="text-foreground"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden bg-background border-t p-4">
					<nav className="flex flex-col space-y-4">
						<Link
							href="/"
							className="text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/about"
							className="text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setIsMenuOpen(false)}
						>
							About
						</Link>
						<Link
							href="/user/dashboard"
							className="text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setIsMenuOpen(false)}
						>
							Dashboard
						</Link>

						{isLoggedIn ? (
							<>
								<Link
									href="/user/profile"
									className="text-foreground hover:text-primary transition-colors py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Profile
								</Link>
								<Link
									href="/settings"
									className="text-foreground hover:text-primary transition-colors py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Settings
								</Link>
								<Button className="mt-2">Logout</Button>
							</>
						) : (
							<div className="flex flex-col space-y-2 mt-2">
								<Button variant="outline" asChild>
									<Link href="/login">Login</Link>
								</Button>
								<Button asChild>
									<Link href="/signup">Sign Up</Link>
								</Button>
							</div>
						)}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Navbar;
