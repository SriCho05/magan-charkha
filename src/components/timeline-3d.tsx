
'use client';

import * as THREE from 'three';
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ScrollControls,
  Scroll,
  Image as DreiImage,
  Text,
  useTexture,
} from '@react-three/drei';
import { useTheme } from 'next-themes';

const timelineEvents = [
  {
    year: '1936',
    title: 'Gandhi in Sevagram',
    description: `Mahatma Gandhi moved to Sevagram, near Wardha, and made it his base. He founded an ashram in Maganwadi, named after Maganlal Gandhi, a rural scientist and Gandhi’s close associate.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'gandhi spinning',
  },
  {
    year: '1949',
    title: 'A New Visionary',
    description: `Dr. Devendra Kumar, an oil technologist, joined Gandhi’s movement. He began efforts to uplift the rural poor using science and technology.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'indian village'
  },
  {
    year: '1952–1960',
    title: 'Understanding Rural Life',
    description: `Devendra Bhai lived with the landless poor in Machala, a hilly village near Indore, for 8 years to deeply understand rural life.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'village landscape'
  },
  {
    year: '1972-1978',
    title: 'Research & Innovation',
    description: `Devendra Bhai assisted Kumarappaji, a Gandhian economist, in research and innovation in village industries for six years.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'old workshop'
  },
  {
    year: '1978',
    title: 'A Centre is Born',
    description: `Centre of Science for Villages (CSV) was founded at Magan Sangrahalaya, Wardha by Devendra Bhai. His daughter, Dr. Vibha Gupta, joined him and started working toward sustainable rural livelihoods.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'father daughter'
  },
  {
    year: 'Present',
    title: 'Carrying the Legacy Forward',
    description: `Dr. Vibha Gupta carries forward her father's mission. She currently serves as the Chairperson of the Magan Sangrahalaya Samiti, overseeing Magan Khadi’s operations focused on organic khadi, rural artisanship, and sustainable livelihoods.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'woman leader'
  },
];

const damp = THREE.MathUtils.damp;

function TimelineItem({ index, position, image, year, title, description, scale, onImageLoaded, dark }) {
    const ref = useRef<THREE.Group>(null!);
    const scroll = useThree(state => state.viewport.height);
    const texture = useTexture(image, onImageLoaded);
  
    useFrame((state, delta) => {
      const y = state.mouse.y * (state.viewport.height / 8);
      ref.current.position.y = damp(ref.current.position.y, -position[1] + y, 4, delta);
    });
  
    return (
      <group position={position} scale={[scale, scale, scale]} ref={ref}>
        <DreiImage url={image} scale={[2.5, 3, 1]} position={[-1.5, 0.5, 0]} transparent opacity={0.9}/>
        <Text
          font="/fonts/PlayfairDisplay-Bold.ttf"
          fontSize={0.8}
          color={dark ? '#FFFFFF' : '#000000'}
          anchorX="left"
          anchorY="top"
          position={[1, 1.5, 0]}
        >
          {year}
        </Text>
         <Text
          font="/fonts/PlayfairDisplay-Regular.ttf"
          fontSize={0.3}
          color={dark ? '#FAFAFA' : '#111111'}
          anchorX="left"
          anchorY="top"
          position={[1, 0.5, 0]}
          maxWidth={2}
        >
          {title}
        </Text>
        <Text
          font="/fonts/PTSans-Regular.ttf"
          fontSize={0.15}
          color={dark ? '#A3A3A3' : '#737373'}
          anchorX="left"
          anchorY="top"
          position={[1, 0.1, 0]}
          maxWidth={2}
        >
          {description}
        </Text>
      </group>
    );
  }

function Timeline() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const totalImages = timelineEvents.length;

  const handleImageLoaded = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  const allImagesLoaded = imagesLoaded === totalImages;

  return (
    <>
      <Scroll>
        {allImagesLoaded && timelineEvents.map((event, i) => (
          <TimelineItem
            key={i}
            index={i}
            position={[i % 2 === 0 ? -0.5 : 0.5, i * (h/2.5) + (h/4), 0]}
            scale={w / 8}
            year={event.year}
            title={event.title}
            description={event.description}
            image={event.image}
            onImageLoaded={handleImageLoaded}
            dark={isDark}
          />
        ))}
      </Scroll>
    </>
  );
}

export default function Timeline3D() {
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const totalImages = timelineEvents.length;

  const handleImageLoaded = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const allImagesLoaded = imagesLoaded === totalImages;

  return (
    <div className="h-[400vh] w-full relative">
        <div className="sticky top-0 h-screen w-full">
            <Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-background"><p>Loading 3D assets...</p></div>}>
              <Canvas dpr={[1, 2]}>
                  <ScrollControls pages={timelineEvents.length * 0.5} damping={0.5}>
                      <Timeline />
                  </ScrollControls>
              </Canvas>
            </Suspense>
        </div>
    </div>
  );
}
