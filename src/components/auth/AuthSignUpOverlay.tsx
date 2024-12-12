import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

interface AuthLoadingOverlayProps {
    isLoading: boolean;
    error?: string | null;
    onErrorDismiss?: () => void;
}

const AuthSignUpOverlay: React.FC<AuthLoadingOverlayProps> = ({
    isLoading,
    error,
    onErrorDismiss
}) => {
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
                                <div className="relative w-24 h-24 mb-8">
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src="/deauthCircleIcon2.png"
                                            alt="Loading..."
                                            fill
                                            className="object-contain"
                                        />
                                    </motion.div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full max-w-xs bg-white/10 rounded-full h-1 mb-4">
                                    <motion.div
                                        className="bg-accent h-full rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>

                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="text-white text-lg font-heading1"
                                >
                                    Creating your account...
                                </motion.p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-black/60 rounded-xl border border-red-500/20 p-6 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 relative">
                                    <motion.div
                                        animate={{
                                            rotate: [-10, 10, -10],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image
                                            src="/deauthCircleIcon2.png"
                                            alt="Error"
                                            width={64}
                                            height={64}
                                            className="opacity-50"
                                        />
                                    </motion.div>
                                </div>

                                <h3 className="text-red-500 text-xl font-heading1 mb-2">Oops!</h3>
                                <p className="text-white/80 mb-6">{error}</p>

                                <button
                                    onClick={onErrorDismiss}
                                    className="px-6 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
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

export default AuthSignUpOverlay;