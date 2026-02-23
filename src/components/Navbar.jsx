import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass border-b border-white/10 opacity-100' : 'py-6 bg-transparent opacity-90'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold font-syne text-gradient tracking-tight">
                    AURA CASES
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {['Shop', 'Collections', 'Brands', 'Custom', 'About'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-white/70 transition-colors uppercase tracking-widest text-dim">
                            {item}
                        </a>
                    ))}
                    <button className="flex items-center space-x-2 bg-[var(--accent-purple)] px-6 py-2.5 rounded-full hover:scale-105 transition-transform">
                        <ShoppingCart size={18} />
                        <span className="font-bold text-sm">Cart (0)</span>
                    </button>
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button className="text-white"><ShoppingCart size={24} /></button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full glass p-6 flex flex-col space-y-4 md:hidden"
                    >
                        {['Shop', 'Collections', 'Brands', 'Custom', 'About'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-center">
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
