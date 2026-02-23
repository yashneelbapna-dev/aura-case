import React from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundMesh from './components/BackgroundMesh';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

function App() {
    return (
        <div className="relative selection:bg-[var(--accent-purple)] selection:text-white">
            <CustomCursor />
            <BackgroundMesh />
            <Navbar />

            <main>
                <Hero />
                <Marquee />
                <Stats />
                <CategoryGrid />
                <ProductGrid />
                <Features />
                <Testimonials />
                <CTABanner />
            </main>

            <Footer />
        </div>
    );
}

export default App;
