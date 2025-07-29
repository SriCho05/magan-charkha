
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const textLines = [
    "A thread of history...",
    "...woven into the future.",
    "Each piece tells a story.",
    "Wear the legacy.",
];

const WhiteVoid = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || hasNavigated) return;

            const { top, height } = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Start the effect when the top of the section reaches the top of the viewport
            if (top <= 0) {
                setIsFixed(true);
                // Calculate progress from 0 to 1 based on how far we've scrolled into the section
                // The total scrollable distance for the animation is height - windowHeight
                const progress = Math.min(1, (-top) / (height - windowHeight));
                setScrollProgress(progress);

                // Trigger navigation when we've scrolled past the component
                if (progress >= 1 && !hasNavigated) {
                    setHasNavigated(true);
                    setTimeout(() => router.push('/shop'), 500); // Delay for fade-out
                }
            } else {
                setIsFixed(false);
                setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [router, hasNavigated]);
    
    // Determine which text line is active
    const lineCount = textLines.length;
    const activeLineIndex = Math.min(lineCount - 1, Math.floor(scrollProgress * (lineCount + 1)));

    // Calculate fade for the final black-out transition
    const fadeOutOpacity = scrollProgress > 0.9 ? (1 - scrollProgress) / 0.1 : 1;

    return (
        <div ref={sectionRef} className="relative bg-background" style={{ height: '300vh' }}>
            <div
                style={{
                    position: isFixed ? 'fixed' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <div
                    className="h-screen w-full flex items-center justify-center transition-colors duration-500"
                    style={{ backgroundColor: `rgba(255, 255, 255, ${scrollProgress})` }}
                >
                    <div 
                        className="text-center transition-opacity duration-300"
                        style={{ opacity: fadeOutOpacity }}
                    >
                        {textLines.map((line, index) => {
                            const isVisible = index === activeLineIndex;
                            return (
                                <h2
                                    key={index}
                                    className={cn(
                                        'font-headline text-4xl md:text-6xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity duration-1000',
                                        isVisible ? 'opacity-100' : 'opacity-0'
                                    )}
                                >
                                    {line}
                                </h2>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhiteVoid;
