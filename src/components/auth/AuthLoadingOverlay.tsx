import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

interface AuthLoadingOverlayProps {
    isLoading: boolean;
    loadingMessage?: string;
    error?: string | null;
    onErrorDismiss?: () => void;
}

export const AuthLoadingOverlay = ({
    isLoading,
    loadingMessage = "Logging in...",
    error,
    onErrorDismiss
}: AuthLoadingOverlayProps) => {
    return (
        <AnimatePresence>
            {(isLoading || error) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                >
                    <div className="relative w-full max-w-md p-8">
                        {isLoading && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Rotating Logo */}
                                <div className="relative w-24 h-24 mb-6">
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                    >
                                        <Image
                                            src="/deauthCircleIcon2.png"
                                            alt="Loading"
                                            width={96}
                                            height={96}
                                            className="object-contain drop-shadow-lg"
                                        />
                                    </motion.div>

                                    {/* Glowing ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            border: '2px solid rgba(255,125,5,0.5)',
                                            filter: 'blur(4px)'
                                        }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full max-w-xs bg-white/10 rounded-full h-1 overflow-hidden mb-4">
                                    <motion.div
                                        className="h-full bg-accent"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-white/80 font-heading1"
                                >
                                    {loadingMessage}
                                </motion.p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-black/60 rounded-xl border border-red-500/20 p-6"
                            >
                                <motion.div
                                    animate={{ rotate: [-10, 10, -10] }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 mx-auto mb-4"
                                >
                                    <Image
                                        src="/deauthCircleIcon2.png"
                                        alt="Error"
                                        width={64}
                                        height={64}
                                        className="opacity-50"
                                    />
                                </motion.div>

                                <h3 className="text-red-500 text-xl font-heading1 text-center mb-2">
                                    Authentication Failed
                                </h3>
                                <p className="text-white/70 text-center mb-6">{error}</p>

                                <button
                                    onClick={onErrorDismiss}
                                    className="w-full px-6 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                                >
                                    Try Again
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};