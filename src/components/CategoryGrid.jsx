import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';

const CategoryCard = ({ title, emoji, count, className = "" }) => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden glass-card rounded-3xl p-8 group cursor-pointer ${className}`}
        >
            {/* Dynamic Background Light */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 109, 250, 0.15), transparent 70%)`
                }}
            />

            {/* Watermark Emoji */}
            <div className="absolute -right-8 -bottom-8 text-9xl opacity-[0.03] rotate-12 transition-transform duration-500 group-hover:scale-110">
                {emoji}
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110 group-hover:-rotate-12 inline-block">
                        {emoji}
                    </div>
                    <h3 className="text-2xl font-syne font-bold mb-1">{title}</h3>
                    <p className="text-dim text-sm">{count} Designs</p>
                </div>

                <div className="mt-8">
                    <button className="p-3 rounded-full border border-white/10 group-hover:border-white/30 transition-all group-hover:bg-white/10">
                        <MoveUpRight className="transition-transform duration-300 group-hover:rotate-45" size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const CategoryGrid = () => {
    return (
        <section id="collections" className="py-24">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <span className="text-[var(--accent-pink)] font-bold tracking-widest uppercase text-xs">Explore</span>
                    <h2 className="text-4xl md:text-5xl font-syne font-extrabold mt-2">Shop by Category</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
                    <CategoryCard
                        title="Gradient Series"
                        emoji="🌈"
                        count="150+"
                        className="md:col-span-2 md:row-span-2"
                    />
                    <CategoryCard
                        title="Rugged Pro"
                        emoji="🛡️"
                        count="80+"
                    />
                    <CategoryCard
                        title="Clear Crystal"
                        emoji="💎"
                        count="45+"
                    />
                    <CategoryCard
                        title="Artisan Prints"
                        emoji="🎨"
                        count="120+"
                        className="md:col-span-2"
                    />
                    <CategoryCard
                        title="MagSafe Series"
                        emoji="🧲"
                        count="60+"
                    />
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
