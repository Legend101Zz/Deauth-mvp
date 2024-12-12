import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LiveStockCounter = () => {
    const [stock, setStock] = useState(97);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setIsAnimating(true);
                setStock((prev) => Math.max(0, prev - 1));
                setTimeout(() => setIsAnimating(false), 1000);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full"
            animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        >
            <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-white/70 text-sm">
                Only {stock} items left in stock
            </span>
        </motion.div>
    );
};
