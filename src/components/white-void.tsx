
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
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
    const scrollAnimationRef = useRef<number>();
    const userScrollTimeoutRef = useRef<NodeJS.Timeout>();

    const [scrollProgress, setScrollProgress] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [hasNavigated, setHasNavigated] = useState(false);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    
    const { resolvedTheme } = useTheme();

    // Main effect for scroll-based animation logic
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || hasNavigated) return;

            const { top, height } = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Section becomes fixed when its top reaches the top of the viewport
            const isCurrentlyFixed = top <= 0;
            
            setIsFixed(isCurrentlyFixed);

            if (isCurrentlyFixed) {
                // Calculate progress based on how much of the "scrollable" part of the div has been scrolled
                const scrollableHeight = height - windowHeight;
                const progress = Math.min(1, (-top) / scrollableHeight);
                setScrollProgress(progress);

                // If progress reaches 1, start navigation
                if (progress >= 1 && !hasNavigated) {
                    setHasNavigated(true);
                    // Use a timeout to allow the final fade-out animation to complete
                    setTimeout(() => router.push('/shop'), 500); 
                }
            } else {
                 // Reset progress if scrolling back up before the section is fixed
                 setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [router, hasNavigated]);

    // Effect for handling auto-scrolling
    useEffect(() => {
        const autoScroll = () => {
            // Stop if section is no longer fixed, user is interacting, or navigation has started
            if (!isFixed || isUserScrolling || hasNavigated) {
                if (scrollAnimationRef.current) {
                    cancelAnimationFrame(scrollAnimationRef.current);
                }
                return;
            }
            window.scrollBy(0, 1.2); // Adjust speed here
            scrollAnimationRef.current = requestAnimationFrame(autoScroll);
        };

        if (isFixed && !isUserScrolling && !hasNavigated) {
            scrollAnimationRef.current = requestAnimationFrame(autoScroll);
        } else {
             if (scrollAnimationRef.current) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }
        }

        return () => {
            if (scrollAnimationRef.current) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }
        };
    }, [isFixed, isUserScrolling, hasNavigated]);


    // Effect for detecting user scroll interaction
    useEffect(() => {
        const handleUserScroll = () => {
            setIsUserScrolling(true);
            if (userScrollTimeoutRef.current) {
                clearTimeout(userScrollTimeoutRef.current);
            }
            userScrollTimeoutRef.current = setTimeout(() => {
                setIsUserScrolling(false);
            }, 250); // User is considered "stopped" after 250ms of inactivity
        };

        window.addEventListener('wheel', handleUserScroll, { passive: true });
        window.addEventListener('touchstart', handleUserScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleUserScroll);
            window.removeEventListener('touchstart', handleUserScroll);
            if (userScrollTimeoutRef.current) {
                clearTimeout(userScrollTimeoutRef.current);
            }
        };
    }, []);
    
    const lineCount = textLines.length;
    // Divide progress into stages for each line + a final fade-out stage
    const totalStages = lineCount + 1;
    const activeStage = Math.min(totalStages - 1, Math.floor(scrollProgress * totalStages));
    const activeLineIndex = activeStage < lineCount ? activeStage : -1; // -1 means no line is active

    // Fade out the text completely in the last stage
    const textOpacity = activeStage >= lineCount ? 0 : 1;

    const isDarkMode = resolvedTheme === 'dark';
    const backgroundColor = isDarkMode 
        ? `rgba(10, 10, 10, ${scrollProgress})`
        : `rgba(255, 255, 255, ${scrollProgress})`;
    const textColor = isDarkMode ? 'text-background' : 'text-foreground';

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
                    className="h-full w-full flex items-center justify-center transition-colors duration-500"
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
