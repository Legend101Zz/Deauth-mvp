"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Camera } from 'lucide-react';

interface ProfileHeaderProps {
    user: any;
    backgroundImage?: string;
    profileImage?: string;
}

export const ProfileHeader = ({
    user,
    backgroundImage = "/logo.jpeg",
    profileImage = "/deauthCircleIcon2.png"
}: ProfileHeaderProps) => {
    const { scrollY } = useScroll();
    const headerHeight = useTransform(scrollY, [0, 200], [300, 200]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);
    const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            style={{ height: headerHeight }}
            className="relative w-full overflow-hidden rounded-2xl mb-8"
        >
            {/* Background Pattern */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20"
                style={{ opacity }}
            />
            <motion.div className="absolute inset-0 bg-grid-pattern opacity-10" />

            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0"
                style={{ scale }}
            >
                <Image
                    src={backgroundImage}
                    alt="Cover"
                    fill
                    className="object-cover brightness-50"
                />
            </motion.div>

            {/* Profile Content */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 max-w-7xl mx-auto">
                    {/* Profile Image with Hover Effect */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <div className="w-32 h-32 rounded-full border-4 border-accent overflow-hidden relative">
                            <Image
                                src={user?.image || profileImage}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                            >
                                <Camera className="text-white" />
                            </motion.div>
                        )}
                    </motion.div>

                    <div className="text-center md:text-left text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-heading1 mb-2"
                        >
                            {user?.name || "Fashion Enthusiast"}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/70"
                        >
                            {user?.email || "fashion@example.com"}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4 mt-4"
                        >
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <span className="text-accent font-heading1">{user?.orderCount || 0}</span>
                                <span className="text-white/70 ml-2">Orders</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <span className="text-accent font-heading1">Premium</span>
                                <span className="text-white/70 ml-2">Member</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};