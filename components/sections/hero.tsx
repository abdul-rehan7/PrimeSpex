import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VIDEO_SOURCES = [
  {
    src: 'https://videos.pexels.com/video-files/10184038/10184038-hd_1280_720_30fps.mp4',
    type: 'video/mp4',
    media: '(max-width: 768px)',
  },
  {
    src: 'https://videos.pexels.com/video-files/10184038/10184038-hd_1920_1080_30fps.mp4',
    type: 'video/mp4',
    media: '(min-width: 769px)',
  },
];

const POSTER =
  'https://images.pexels.com/videos/10184038/cityscape-downtown-downtown-indianapolis-downtown-indy-10184038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          aria-hidden="true"
        >
          {VIDEO_SOURCES.map((source) => (
            <source
              key={source.media}
              src={source.src}
              type={source.type}
              media={source.media}
            />
          ))}
        </video>
        {/* Dark mask to lower opacity and ensure text readability */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto w-[90%] max-w-4xl text-center md:w-[65vw]">
          <h1 className="fade-up text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Software engineered
            <br />
            <span className="text-muted-foreground">for ambitious teams.</span>
          </h1>

          <p className="fade-up mt-6 text-balance text-base text-muted-foreground md:text-lg">
            We design and build premium digital products — from web platforms to
            design systems and intelligent automation — with a relentless focus
            on craft and performance.
          </p>

          <div className="fade-up mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#contact">
              <Button size="lg" className="group w-full sm:w-auto">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="#work">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-background/50 backdrop-blur-sm sm:w-auto"
              >
                View our work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
