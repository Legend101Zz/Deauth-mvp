"use client";
import React from "react";
import Image from "next/image";

const Loading = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center bg-background relative overflow-hidden">
			{/* Background grid pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />

			<div className="relative flex flex-col items-center gap-8">
				{/* Main container with orange glow */}
				<div className="relative">
					<div className="absolute inset-0 bg-accent/20 blur-3xl animate-pulse" />

					{/* Rotating circle behind logo */}
					<div className="w-48 h-48 rounded-full border-4 border-dashed border-accent/30 animate-[spin_10s_linear_infinite]" />

					{/* Logo container */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-32 h-32 relative animate-bounce transition-transform duration-1000">
							<Image
								src="/deauthCircleIcon2.png"
								alt="Deauth Logo"Z
								width={200}
								height={200}
								className="object-contain drop-shadow-[0_0_15px_rgba(255,125,5,0.5)]"
							/>
						</div>
					</div>
				</div>

				{/* Animated text */}
				<div className="space-y-4 text-center">
					<h1 className="text-4xl font-heading1 bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent animate-gradient-x">
						DEAUTH
					</h1>
					<p className="text-accent/70 font-heading1 animate-pulse">
						Loading your fashion experience...
					</p>
				</div>

				{/* Animated clothing items */}
				<div className="flex gap-6 mt-4">
					{['👕', '👔', '👗', '🧥'].map((item, index) => (
						<span
							key={index}
							className="text-2xl animate-bounce"
							style={{
								animationDelay: `${index * 0.15}s`,
								animationDuration: '1s'
							}}
						>
							{item}
						</span>
					))}
				</div>

				{/* Progress bar */}
				<div className="w-48 h-1 bg-accent/20 rounded-full overflow-hidden">
					<div className="h-full bg-accent rounded-full animate-progress" />
				</div>
			</div>

			{/* Style definitions */}
			<style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% auto;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
		</div>
	);
};

export default Loading;