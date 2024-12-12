import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState('black');

    const colors = [
        { name: 'black', hex: '#000000', label: 'Midnight Black' },
        { name: 'navy', hex: '#1a237e', label: 'Deep Navy' },
        { name: 'charcoal', hex: '#37474f', label: 'Charcoal Gray' }
    ];

    return (
        <div className="space-y-4">
            <label className="text-white/70">Select Color</label>
            <div className="flex gap-4">
                {colors.map((color) => (
                    <motion.button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div
                            className={`w-12 h-12 rounded-full ${selectedColor === color.name ? 'ring-2 ring-accent ring-offset-2' : ''
                                }`}
                            style={{ backgroundColor: color.hex }}
                        />
                        <AnimatePresence>
                            {selectedColor === color.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm text-white whitespace-nowrap"
                                >
                                    {color.label}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
