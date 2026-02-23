import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { damping: 20, stiffness: 100 };
    const ringX = useSpring(0, springConfig);
    const ringY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            ringX.set(e.clientX);
            ringY.set(e.clientY);
        };

        const handleHoverStart = (e) => {
            if (e.target.closest('button, a, .glass-card, .hover-target')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHoverStart);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHoverStart);
        };
    }, [ringX, ringY]);

    return (
        <>
            {/* Small dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
                style={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
            />
            {/* Larger following ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 2 : 1,
                    borderColor: isHovered ? 'var(--accent-purple)' : 'white'
                }}
                transition={{ type: 'spring', ...springConfig }}
            />
        </>
    );
};

export default CustomCursor;
