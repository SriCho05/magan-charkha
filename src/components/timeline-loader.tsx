
'use client';

import dynamic from 'next/dynamic';

const Timeline3D = dynamic(() => import('@/components/timeline-3d'), {
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center bg-background"><p>Loading timeline...</p></div>
});

export default function TimelineLoader() {
  return <Timeline3D />;
}
