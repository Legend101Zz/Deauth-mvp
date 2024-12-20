"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	motion,
	useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductDetailsDrawer } from "@/components/ProductPage/ProductDetailsDrawer";
import HeroBanner from "@/components/Home/HeroBanner";
import Features from "@/components/Home/Feautures/Features";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProductSelectionSection from "@/components/Home/ProductSelectionSection/ProductSelectionSection";
import Loading from "./loading";
import type { Metadata } from 'next';





export default function Home() {
	const containerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Define metadata for the home page
	const metadata: Metadata = {
		title: 'Deauth | Premium Custom Apparel by Independent Artists',
		description: 'Shop unique, water-resistant hoodies and premium apparel featuring designs by independent artists. Join Deauth\'s creative community today.',
		keywords: ['custom apparel', 'designer hoodies', 'artist marketplace', 'premium clothing', 'water resistant hoodie'],
		openGraph: {
			title: 'Deauth - Where Art Meets Apparel',
			description: 'Premium custom apparel featuring unique designs from independent artists',
			images: [{ url: '/og-image.jpeg', width: 1200, height: 630 }],
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 10000); // 3 seconds

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main ref={containerRef}
			className="relative min-h-screen"
			itemScope
			itemType="https://schema.org/WebPage">

			{/* SEO-friendly hidden heading */}
			<h1 className="sr-only">Deauth - Premium Custom Apparel Marketplace for Independent Artists</h1>

			{/* Hero Banner */}
			<AnimatedBackground aria-hidden="true" />
			{/* <Beam/> */}
			{/* <HeroHighlight/> */}

			{/* Main Content */}
			<div className="relative z-10">
				{/* Hero Section */}
				<HeroBanner />
				<Features />
				{/* Product Details Section */}
				<ProductSelectionSection />



				{/* Coming Soon Section */}
				<section className="relative py-32 bg-secondaryBackground overflow-hidden" itemScope
					itemType="https://schema.org/Product">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="absolute inset-0"
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),transparent_70%)]" />
					</motion.div>

					<div className="container mx-auto px-4 text-center relative z-10">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="max-w-2xl mx-auto"
						>
							<h2 className="text-4xl md:text-5xl font-heading1 text-white mb-6">
								More Collections{" "}
								<span className="text-accent">Coming Soon</span>
							</h2>
							<p className="text-white/70 mb-8">
								Join our community and be the first to know about our upcoming
								releases
							</p>
							<Button
								variant="outline"
								className="border-accent/20 text-white hover:bg-accent/10 rounded-full py-6 px-8 text-lg font-heading1"
							>
								Get Notified
							</Button>
						</motion.div>
					</div>
				</section>
				<ProductDetailsDrawer
					isOpen={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
				/>
			</div>
		</main>
	);
}
