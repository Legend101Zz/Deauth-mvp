import { motion } from "framer-motion";
import { Droplets, Shield, Wind, ArrowRight } from "lucide-react";


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


export const ProductFeatures = () => {
    return (
        <section className="py-32 relative bg-secondaryBackground">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-heading1 text-white mb-4">
                        Crafted for <span className="text-accent">Excellence</span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Every detail matters in our premium hoodie design
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-accent/5 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                            <div className="relative bg-background border border-accent/10 rounded-xl p-8 hover:border-accent/30 transition-colors duration-300">
                                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-accent">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-heading1 text-accent mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-white/70">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};