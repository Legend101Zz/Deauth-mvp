import { motion } from "framer-motion";
import { useState } from "react";

export const SizeSelector = () => {
    const [selectedSize, setSelectedSize] = useState('M');
    const sizes = ['S', 'M', 'L', 'XL'];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-white/70">Select Size</label>
                <button
                    className="text-accent text-sm hover:underline"
                    onClick={() => setShowSizeGuide(true)}
                >
                    Size Guide
                </button>
            </div>
            <div className="flex gap-3">
                {sizes.map((size) => (
                    <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${selectedSize === size
                            ? 'border-accent text-accent'
                            : 'border-white/20 text-white'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {size}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
