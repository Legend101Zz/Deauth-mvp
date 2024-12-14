"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const images = ['1.jpg', '2 .jpg']; // Replace with your image paths

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-70 overflow-hidden rounded-lg">
      <motion.div
        className="flex"
        initial={false}
        animate={{ x: -currentIndex * 256 }} // Adjust the value to match your image width
        transition={{ ease: 'easeInOut', duration: 1 }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-64 h-70 object-cover flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ImageSlider;
