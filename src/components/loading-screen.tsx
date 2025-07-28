
'use client';

import { Leaf } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
        <div className="flex items-center gap-4">
            <Leaf className="w-12 h-12 text-primary animate-pulse" />
            <div className="overflow-hidden border-r-4 border-primary whitespace-nowrap animate-typing">
                <h1 className="font-headline text-5xl md:text-7xl font-bold">
                    Magancharkha
                </h1>
            </div>
        </div>
    </div>
  );
}
