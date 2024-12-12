import { motion } from "framer-motion";
import { Droplets, Shield, Wind, ArrowRight } from "lucide-react";

interface ProductGalleryProps {
    activeFeature: number;
    setActiveFeature: (index: number) => void;
}

export const ProductGallery = ({
    activeFeature,
    setActiveFeature
}: ProductGalleryProps) => {
    const features = [
        { icon: Droplets, title: "Water Resistant" },
        { icon: Shield, title: "Premium Material" },
        { icon: Wind, title: "Perfect Fit" }
    ];

    return (
        <div className="relative">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
            >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] animate-pulse-slow" />

                {/* Product image with hover effect */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src="/C_hoodie.png"
                        alt="Premium Hoodie"
                        width={600}
                        height={600}
                        className="object-contain relative z-10"
                    />
                </motion.div>

                {/* Feature indicators */}
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: activeFeature === index ? 1 : 0.5,
                            scale: 1,
                            x: Math.cos(index * (Math.PI * 2 / 3)) * 150,
                            y: Math.sin(index * (Math.PI * 2 / 3)) * 150
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onMouseEnter={() => setActiveFeature(index)}
                    >
                        <div className="glass-effect p-4 rounded-full">
                            <feature.icon className={`w-6 h-6 ${activeFeature === index ? 'text-accent' : 'text-white/50'
                                }`} />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};