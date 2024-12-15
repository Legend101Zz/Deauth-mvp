"use client";
import { motion } from 'framer-motion';

export const BackgroundAnimation = () => {
    return (
        <motion.div className="fixed inset-0 -z-10">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),rgba(0,0,0,1)_70%)]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-accent/20 rounded-full"
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};