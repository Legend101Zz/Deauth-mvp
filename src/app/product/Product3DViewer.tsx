import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ProductHotspots } from "./ProductHotspots";

export const Product3DViewer = () => {
    const [rotation, setRotation] = useState(0);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAutoRotating) {
            const interval = setInterval(() => {
                setRotation((prev) => (prev + 1) % 360);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isAutoRotating]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const rotation = (x / width) * 360;

        setRotation(rotation);
        setIsAutoRotating(false);
    };

    const handleMouseLeave = () => {
        setIsAutoRotating(true);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-square"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ rotateY: rotation }}
            >
                <img
                    src="/hood.png"
                    alt="Premium Hoodie"

                    className="object-contain"
                />

                {/* Interactive Hotspots */}
                <ProductHotspots rotation={rotation} />
            </motion.div>
        </div>
    );
};