"use client";
import SignupForm from "@/components/auth/SignUpForm";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Signup = () => {
	return (
		<div className="relative min-h-screen bg-black text-white overflow-hidden">
			{/* Gradient Background */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-20%,rgba(255,125,5,0.15),transparent_70%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(255,125,5,0.1),transparent_50%)]" />
				<div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
						backgroundSize: '50px 50px'
					}}
				/>
			</div>

			<main className="relative z-10">
				{/* Navigation Bar */}
				<nav className="absolute top-0 left-0 w-full p-6">
					<Link href="/" className="flex items-center gap-4 w-fit">
						<motion.div
							initial={{ rotate: -10, scale: 0.9 }}
							animate={{ rotate: 0, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="relative w-12 h-12"
						>
							<Image
								src="/deauthCircleIcon2.png"
								alt="Deauth"
								fill
								className="object-contain"
							/>
						</motion.div>
						<div className="text-white">
							<motion.h1
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								className="text-xl font-heading1"
							>
								DEAUTH
							</motion.h1>
						</div>
					</Link>
				</nav>

				{/* Main Content */}
				<div className="min-h-screen flex">
					{/* Left Section - Hero/Marketing */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="hidden lg:flex w-1/2 flex-col justify-center px-20"
					>
						<div className="max-w-xl">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="mb-6"
							>
								<span className="text-accent text-sm font-semibold px-4 py-2 rounded-full bg-accent/10">
									Limited Time Offer
								</span>
							</motion.div>

							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className="text-5xl font-heading1 leading-tight mb-6"
							>
								Join the Future of <span className="text-accent">Fashion</span>
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="text-white/60 text-lg mb-8"
							>
								Sign up today and get 20% off your first purchase. Experience unique designs
								crafted by talented artists worldwide.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
								className="grid grid-cols-2 gap-6"
							>
								{[
									{ number: "10K+", label: "Happy Customers" },
									{ number: "500+", label: "Unique Designs" }
								].map((stat, index) => (
									<div key={index} className="border border-accent/20 rounded-2xl p-4 bg-accent/5">
										<h3 className="text-2xl font-heading1 text-accent">{stat.number}</h3>
										<p className="text-white/60 text-sm">{stat.label}</p>
									</div>
								))}
							</motion.div>
						</div>
					</motion.div>

					{/* Right Section - Signup Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-20"
					>
						<div className="w-full max-w-md">
							<div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-accent/10 p-8 shadow-2xl">
								<div className="text-center mb-8">
									<h3 className="text-3xl font-heading1 text-accent mb-2">Create Account</h3>
									<p className="text-white/60">Start your fashion journey today</p>
								</div>

								<SignupForm />

								<div className="mt-8 text-center">
									<p className="text-white/40 text-sm mb-4">Already have an account?</p>
									<Link
										href="/auth/login"
										className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
									>
										Sign in to your account <ArrowRight size={16} />
									</Link>
								</div>
							</div>

							{/* Trust Badges */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
								className="mt-8 grid grid-cols-3 gap-4"
							>
								{[
									{ icon: "🔒", label: "Secure Checkout" },
									{ icon: "🚚", label: "Free Shipping" },
									{ icon: "💯", label: "Quality Guarantee" }
								].map((badge, index) => (
									<div key={index} className="text-center">
										<div className="text-2xl mb-1">{badge.icon}</div>
										<p className="text-white/40 text-xs">{badge.label}</p>
									</div>
								))}
							</motion.div>
						</div>
					</motion.div>
				</div>
			</main>

			{/* Decorative Elements */}
			<div className="fixed bottom-6 left-6 text-white/20 text-sm font-heading1">
				Where Art Meets Apparel
			</div>
		</div>
	);
};

export default Signup;