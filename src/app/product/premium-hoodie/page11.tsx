"use client"
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Droplets, Shield, Wind, ArrowRight } from "lucide-react";
import { ProductDetailsDrawer } from "@/components/ProductPage/ProductDetailsDrawer";
import { AnimatedBackground } from "../AnimatedBackground";
import { ProductFeatures } from "../ProductFeatures";
import { ProductGallery } from "../ProductGallery";

// Features data
const FEATURES = [
    {
        icon: Droplets,
        title: "Water Resistant",
        description: "Korean fabric with water repellent coating"
    },
    {
        icon: Shield,
        title: "Premium Material",
        description: "Ultra-soft premium cotton blend"
    },
    {
        icon: Wind,
        title: "Perfect Fit",
        description: "Tailored design with ribbed cuffs"
    }
];

// Size options
const SIZES = ['S', 'M', 'L', 'XL'];

export default function PremiumHoodiePage() {
    const [selectedSize, setSelectedSize] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <main ref={containerRef} className="relative min-h-screen">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left Content - Product Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Brand Tag */}
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    className="inline-block"
                                >
                                    <div className="glass-effect px-6 py-3 rounded-full flex items-center gap-3">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Image
                                                src="/deauthCircleIcon.png"
                                                alt="Deauth Icon"
                                                width={30}
                                                height={30}
                                            />
                                        </motion.div>
                                        <span className="font-heading1 text-accent">DEAUTH PREMIUM</span>
                                    </div>
                                </motion.div>

                                {/* Main Title */}
                                <div className="space-y-2">
                                    <motion.h1
                                        className="text-5xl md:text-7xl font-heading1 leading-tight"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <span className="text-white">The</span>
                                        <span className="text-gradient block">Ultimate Black</span>
                                        <span className="text-white">Hoodie</span>
                                    </motion.h1>
                                    <motion.p
                                        className="text-xl text-white/70"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Water-resistant. Premium. Perfect fit.
                                    </motion.p>
                                </div>

                                {/* Price Tag */}
                                <motion.div
                                    className="flex items-center gap-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <div className="text-4xl font-heading1 text-white">₹1,999</div>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        className="h-[2px] bg-gradient-to-r from-accent to-transparent flex-1"
                                    />
                                </motion.div>

                                {/* Size Selection */}
                                <div className="space-y-4">
                                    <h3 className="text-white/80">Select Size</h3>
                                    <div className="flex gap-3">
                                        {SIZES.map(size => (
                                            <Button
                                                key={size}
                                                variant={selectedSize === size ? "default" : "outline"}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 rounded-full ${selectedSize === size
                                                    ? "bg-accent hover:bg-accent/90"
                                                    : "border-accent/20 hover:bg-accent/10"
                                                    }`}
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <Button
                                        className="bg-accent hover:bg-accent/90 text-white rounded-full py-6 px-8 text-lg font-heading1 hover-lift"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <span className="relative">
                                            Buy Now
                                            <motion.span
                                                animate={{ x: isHovered ? 5 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ArrowRight className="ml-2 inline-block" />
                                            </motion.span>
                                        </span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-accent/20 text-white hover:bg-accent/10 rounded-full py-6 px-8 text-lg font-heading1 animated-border"
                                        onClick={() => setIsDrawerOpen(true)}
                                    >
                                        Learn More
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Right Content - Product Image */}
                            <ProductGallery
                                activeFeature={activeFeature}
                                setActiveFeature={setActiveFeature}
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <ProductFeatures />

                {/* Product Details Drawer */}
                <ProductDetailsDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </div>
        </main>
    );
}