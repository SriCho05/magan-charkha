
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/use-locale';

const textLineKeys = [
    "A thread of history...",
    "...woven into the future.",
    "Each piece tells a story.",
    "Wear the legacy.",
];

// Helper to parse HSL strings like '20 15% 10%' into an object
const parseHsl = (hslStr: string) => {
    if (!hslStr) return { h: 0, s: 0, l: 0 };
    const [h, s, l] = hslStr.replace(/%/g, '').split(' ').map(Number);
    return { h, s, l };
};

// Helper to interpolate between two HSL lightness values
const interpolateLightness = (l1: number, l2: number, progress: number) => {
    return l1 + (l2 - l1) * progress;
};

const WhiteVoid = () => {
    const { t } = useLocale();
    const router = useRouter();
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollAnimationRef = useRef<number>();
    const userScrollTimeoutRef = useRef<NodeJS.Timeout>();

    const [scrollProgress, setScrollProgress] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [hasNavigated, setHasNavigated] = useState(false);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [initialBgHsl, setInitialBgHsl] = useState({ h: 0, s: 0, l: 0 });
    
    const { resolvedTheme } = useTheme();

    const textLines = textLineKeys.map(key => t(key));

    // Effect to grab the theme's background color for interpolation
    useEffect(() => {
        // We need to get the computed style from the root element to find the HSL values
        const rootStyle = getComputedStyle(document.documentElement);
        const bgHslString = rootStyle.getPropertyValue('--background').trim();
        setInitialBgHsl(parseHsl(bgHslString));
    }, [resolvedTheme]);


    // Main effect for scroll-based animation logic
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || hasNavigated) return;

            const { top, height } = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const isCurrentlyFixed = top <= 0;
            
            setIsFixed(isCurrentlyFixed);

            if (isCurrentlyFixed) {
                const scrollableHeight = height - windowHeight;
                const progress = Math.min(1, (-top) / scrollableHeight);
                setScrollProgress(progress);

                if (progress >= 1 && !hasNavigated) {
                    setHasNavigated(true);
                    setTimeout(() => router.push('/shop'), 500); 
                }
            } else {
                 setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [router, hasNavigated]);

    // Effect for handling auto-scrolling
    useEffect(() => {
        const autoScroll = () => {
            if (!isFixed || isUserScrolling || hasNavigated) {
                if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
                return;
            }
            
            const lineCount = textLines.length;
            const totalStages = lineCount + 1;
            const currentStage = Math.floor(scrollProgress * totalStages);
            
            const scrollSpeed = currentStage >= lineCount ? 2.5 : 1.5;

            window.scrollBy(0, scrollSpeed);
            scrollAnimationRef.current = requestAnimationFrame(autoScroll);
        };

        if (isFixed && !isUserScrolling && !hasNavigated) {
            scrollAnimationRef.current = requestAnimationFrame(autoScroll);
        } else {
             if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
        }

        return () => {
            if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
        };
    }, [isFixed, isUserScrolling, hasNavigated, scrollProgress, textLines.length]);


    // Effect for detecting user scroll interaction
    useEffect(() => {
        const handleUserScroll = () => {
            setIsUserScrolling(true);
            if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
            userScrollTimeoutRef.current = setTimeout(() => setIsUserScrolling(false), 250);
        };

        window.addEventListener('wheel', handleUserScroll, { passive: true });
        window.addEventListener('touchstart', handleUserScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleUserScroll);
            window.removeEventListener('touchstart', handleUserScroll);
            if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
        };
    }, []);
    
    const lineCount = textLines.length;
    const totalStages = lineCount + 1;
    const activeStage = Math.min(totalStages - 1, Math.floor(scrollProgress * totalStages));
    const activeLineIndex = activeStage < lineCount ? activeStage : -1; 
    const textOpacity = activeStage >= lineCount ? 0 : 1;
    const isDarkMode = resolvedTheme === 'dark';

    // Interpolate the background color for a smooth fade
    const targetLightness = isDarkMode ? 0 : 100; // Fade to black (0%) or white (100%)
    const currentLightness = interpolateLightness(initialBgHsl.l, targetLightness, scrollProgress);
    const backgroundColor = `hsl(${initialBgHsl.h}, ${initialBgHsl.s}%, ${currentLightness}%)`;

    const textColor = isDarkMode ? 'text-foreground' : 'text-foreground';

    return (
        <div ref={sectionRef} className="relative bg-background" style={{ height: '300vh' }}>
            <div
                style={{
                    position: isFixed ? 'fixed' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 'auto',
                    height: '100vh',
                }}
            >
                <div
                    className="h-full w-full flex items-center justify-center transition-colors duration-50" // Fast transition to keep up with scroll
                    style={{ backgroundColor }}
                >
                    <div 
                        className="text-center transition-opacity duration-500"
                        style={{ opacity: textOpacity }}
                    >
                        {textLines.map((line, index) => {
                            const isVisible = index === activeLineIndex;
                            return (
                                <h2
                                    key={index}
                                    className={cn(
                                        'font-headline text-4xl md:text-6xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full px-4',
                                        'transition-opacity duration-1000 ease-in-out',
                                        isVisible ? 'opacity-100' : 'opacity-0',
                                        textColor
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
