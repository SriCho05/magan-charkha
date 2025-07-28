
'use client';

import { Leaf } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
       <div className="flex items-center justify-center">
            <Leaf className="w-12 h-12 text-primary animate-pulse mr-4" />
            <svg viewBox="0 0 500 100" className="w-[350px] h-auto md:w-[500px]">
                <text 
                    className="font-cursive text-8xl font-bold animate-draw-stroke"
                    x="50%" 
                    y="50%" 
                    dy=".35em"
                    textAnchor="middle"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                >
                    Magancharkha
                </text>
            </svg>
        </div>
    </div>
  );
}
