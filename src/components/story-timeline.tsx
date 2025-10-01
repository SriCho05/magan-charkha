
'use client';

import Image from 'next/image';
import ScrollAnimation from './scroll-animation';
import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/use-locale';

const timelineEvents = [
  {
    year: '1936',
    titleKey: '1936_title',
    descriptionKey: '1936_description',
    image: 'https://assets.telegraphindia.com/telegraph/2021/Sep/1631914245_18gandhi_6.jpg',
    aiHint: 'gandhi spinning',
  },
  {
    year: '1949',
    titleKey: '1949_title',
    descriptionKey: '1949_description',
    image: '/photos/Picture2.png',
    aiHint: 'indian village',
  },
  {
    year: '1952–1960',
    titleKey: '1952_title',
    descriptionKey: '1952_description',
    image: '/photos/Picture3.png',
    aiHint: 'village landscape',
  },
  {
    year: '1972-1978',
    titleKey: '1972_title',
    descriptionKey: '1972_description',
    image: '/photos/Picture4.png',
    aiHint: 'old workshop',
  },
  {
    year: '1978',
    titleKey: '1978_title',
    descriptionKey: '1978_description',
    image: '/photos/Picture5.png',
    aiHint: 'father daughter',
  },
  {
    year: 'Present',
    titleKey: 'Present_title',
    descriptionKey: 'Present_description',
    image: '/photos/Picture1.png',
    aiHint: 'woman leader',
  },
];

export default function StoryTimeline() {
  const { t } = useLocale();

  return (
    <section className="pt-20 bg-background overflow-x-hidden relative">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="font-headline text-4xl font-bold text-center mb-4">{t('Our Story')}</h2>
          <p className="text-muted-foreground text-lg text-center mb-16 max-w-2xl mx-auto">
            {t('A journey of a hundred years, weaving together science, service, and the spirit of self-reliance.')}
          </p>
        </ScrollAnimation>
        <div className="relative">
          {/* The solid timeline line */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-border"
          />

          <div className="space-y-16 pb-64">
            {timelineEvents.map((event, index) => (
                <div key={index} className={cn("relative flex items-center", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
                  {/* Content */}
                  <div className="md:w-5/12">
                    <ScrollAnimation direction={index % 2 === 0 ? 'right' : 'left'}>
                        <div className="p-6 bg-card rounded-lg shadow-md">
                        <p className="font-headline text-2xl text-primary mb-2">{event.year}</p>
                        <h3 className="font-headline text-xl font-bold mb-3">{t(event.titleKey)}</h3>
                        <p className="text-sm text-muted-foreground">{t(event.descriptionKey)}</p>
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
                            alt={t(event.titleKey)}
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
