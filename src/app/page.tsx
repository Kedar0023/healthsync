"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { motion } from "framer-motion";

const Home: React.FC = () => {
	const router = useRouter();

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { 
			opacity: 0,
			x: -50,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				damping: 20,
				stiffness: 100
			}
		}
	};

	const lineVariants = {
		hidden: { 
			scaleX: 0,
			opacity: 0
		},
		visible: {
			scaleX: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 20,
				duration: 0.3
			}
		}
	};

  // Handle Sign-up Button Click
  const handleSignupClick = () => {
		router.push("/auth/signup");
  };

  // Handle Get Started Button Click
  const handleGetStarted = () => {
		router.push("/user/dashboard");
  };

  return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />
      {/* Hero Section - Text on Left, Image on Right */}
      <header className="flex flex-col md:flex-row items-center justify-between text-left px-8 md:px-16 py-20">
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold">
            A Smarter Way <span className="text-blue-500">to Store & Share</span> Your Health Data
          </h1>
					<p className="mt-4 text-muted-foreground">
            Secure & accessible medical records with QR code sharing.
          </p>
          <button
						className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg text-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
					<img src="/1.svg" alt="Healthcare" className="w-96 md:w-[450px] h-auto" />
        </div>
      </header>

      {/* Flowchart Section */}
			<section id="how-it-works" className="bg-muted/50 py-20 px-6 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-background to-muted opacity-50"></div>
				<div className="relative z-10">
					<motion.h3 
						className="text-3xl text-center font-semibold mb-12"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						How It Works
					</motion.h3>
					<motion.div 
						className="flex flex-wrap justify-center items-center gap-8 text-center max-w-7xl mx-auto"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{["User Registers/Login", "Fills Medical Data", "Generates QR Code", "Saves & Shares QR Code", "Doctor Scans QR Code", "Accesses Medical Data", "User Updates Data"].map((step, index) => (
							<motion.div 
								key={index}
								className="relative flex flex-col items-center"
								variants={itemVariants}
							>
								<motion.div 
									className="bg-card hover:bg-accent p-6 rounded-lg shadow-sm transition-all duration-300 w-[200px]"
									whileHover={{ 
										scale: 1.05,
										boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.2)"
									}}
								>
									<p className="text-lg font-semibold text-foreground/90">{step}</p>
								</motion.div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <h3 className="text-3xl text-center font-semibold">Why Choose Our Health Card?</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
          {["Secure Data", "Instant Access", "Easy Sharing"].map((title, index) => (
						<div key={index} className="bg-card p-6 rounded-lg">
              <h4 className="text-xl font-bold">{title === "Secure Data" ? "🔒 Secure Data" : title === "Instant Access" ? "📱 Instant Access" : "⚡ Easy Sharing"}</h4>
							<p className="mt-2 text-muted-foreground">
                {title === "Secure Data" ? "Your medical data is encrypted and safe." :
                 title === "Instant Access" ? "Scan the QR code to view medical records anytime." :
                 "Share your health details securely with doctors."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
			<section id="cta" className="bg-muted text-center py-20">
        <h3 className="text-2xl font-semibold">Get Your Digital Health Card Today!</h3>
				<p className="mt-2 text-muted-foreground">
          Sign up and generate your unique health QR code now.
        </p>
				<button 
					className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg text-lg"
					onClick={handleSignupClick}
				>
          Sign Up
        </button>
      </section>

      {/* Footer */}
			<footer className="bg-muted text-muted-foreground text-center py-4">
        &copy; 2025 HealthSync | Privacy Policy
      </footer>
    </div>
  );
};

export default Home;
