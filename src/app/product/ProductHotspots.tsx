import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const ProductHotspots = ({ rotation }) => {
    const [activeHotspot, setActiveHotspot] = useState(null);

    const hotspots = [
        {
            id: 1,
            x: 30,
            y: 40,
            rotation: 0,
            label: "Premium Stitching",
            description: "Double-needle stitching for durability"
        },
        {
            id: 2,
            x: 60,
            y: 50,
            rotation: 90,
            label: "Water-Resistant Fabric",
            description: "Advanced coating technology"
        },
        {
            id: 3,
            x: 45,
            y: 70,
            rotation: 180,
            label: "Adjustable Hood",
            description: "Perfect fit in any weather"
        }
    ];

    const isHotspotVisible = (hotspotRotation) => {
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        const diff = Math.abs(normalizedRotation - hotspotRotation);
        return diff <= 90 || diff >= 270;
    };

    return (
        <>
            {hotspots.map((hotspot) => (
                isHotspotVisible(hotspot.rotation) && (
                    <motion.div
                        key={hotspot.id}
                        className="absolute"
                        style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                            opacity: isHotspotVisible(hotspot.rotation) ? 1 : 0
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <motion.button
                            className="w-4 h-4 bg-accent rounded-full relative"
                            whileHover={{ scale: 1.2 }}
                            onMouseEnter={() => setActiveHotspot(hotspot.id)}
                            onMouseLeave={() => setActiveHotspot(null)}
                        >
                            <motion.div
                                className="absolute w-full h-full rounded-full border-2 border-accent"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>

                        <AnimatePresence>
                            {activeHotspot === hotspot.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute left-6 top-0 bg-black/90 p-4 rounded-lg text-white min-w-[200px]"
                                >
                                    <h4 className="font-bold mb-1">{hotspot.label}</h4>
                                    <p className="text-sm text-white/70">{hotspot.description}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )
            ))}
        </>
    );
};