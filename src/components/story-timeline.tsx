
'use client';

import Image from 'next/image';
import ScrollAnimation from './scroll-animation';
import { cn } from '@/lib/utils';

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
    aiHint: 'indian village',
  },
  {
    year: '1952–1960',
    title: 'Understanding Rural Life',
    description: `Devendra Bhai lived with the landless poor in Machala, a hilly village near Indore, for 8 years to deeply understand rural life.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'village landscape',
  },
  {
    year: '1972-1978',
    title: 'Research & Innovation',
    description: `Devendra Bhai assisted Kumarappaji, a Gandhian economist, in research and innovation in village industries for six years.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'old workshop',
  },
  {
    year: '1978',
    title: 'A Centre is Born',
    description: `Centre of Science for Villages (CSV) was founded at Magan Sangrahalaya, Wardha by Devendra Bhai. His daughter, Dr. Vibha Gupta, joined him and started working toward sustainable rural livelihoods.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'father daughter',
  },
  {
    year: 'Present',
    title: 'Carrying the Legacy Forward',
    description: `Dr. Vibha Gupta carries forward her father's mission. She currently serves as the Chairperson of the Magan Sangrahalaya Samiti, overseeing Magan Khadi’s operations focused on organic khadi, rural artisanship, and sustainable livelihoods.`,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'woman leader',
  },
];

export default function StoryTimeline() {
  return (
    <section className="pt-20 bg-background overflow-x-hidden relative">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="font-headline text-4xl font-bold text-center mb-4">Our Story</h2>
          <p className="text-muted-foreground text-lg text-center mb-16 max-w-2xl mx-auto">
            A journey of a hundred years, weaving together science, service, and the spirit of self-reliance.
          </p>
        </ScrollAnimation>
        <div className="relative">
          {/* The solid timeline line */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-border"
          />

          <div className="space-y-16 pb-32">
            {timelineEvents.map((event, index) => (
                <div key={index} className={cn("relative flex items-center", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
                  {/* Content */}
                  <div className="md:w-5/12">
                    <ScrollAnimation direction={index % 2 === 0 ? 'right' : 'left'}>
                        <div className="p-6 bg-card rounded-lg shadow-md">
                        <p className="font-headline text-2xl text-primary mb-2">{event.year}</p>
                        <h3 className="font-headline text-xl font-bold mb-3">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                    </ScrollAnimation>
                  </div>

                  {/* Spacer and Node */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <ScrollAnimation>
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-card absolute z-10 left-1/2 -translate-x-1/2" />
                    </ScrollAnimation>
                  </div>

                  {/* Image */}
                  <div className="md:w-5/12 hidden md:block">
                     <ScrollAnimation direction={index % 2 === 0 ? 'left' : 'right'}>
                        <Image
                            src={event.image}
                            alt={event.title}
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg object-cover"
                            data-ai-hint={event.aiHint}
                        />
                    </ScrollAnimation>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
      {/* This container will create the fade-out effect at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
