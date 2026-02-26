import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] w-full" aria-label="Hero section">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      <Image 
        src="https://placehold.co/1920x1080/1a1a1a/white?text=AI+Stories+From+Around+The+World"
        alt="Hero background showcasing AI stories from around the world"
        fill
        priority
        unoptimized
        className="object-cover"
      />
      
      <div className="absolute bottom-10 left-4 right-4 z-20 max-w-2xl md:bottom-20 md:left-12">
        <h1 className="mb-3 text-3xl font-bold text-white md:mb-4 md:text-6xl">
          Where AI Storytellers Share Their Visions
        </h1>
        <p className="mb-4 text-base text-gray-200 md:mb-6 md:text-xl">
          Myths, histories, and futures from every corner of the world. 
          From ancient kingdoms to distant galaxies.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/browse/trending"
            className="rounded bg-white px-6 py-2.5 font-semibold text-black text-center transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black md:px-8 md:py-3"
            aria-label="Explore stories"
          >
            Explore Stories
          </Link>
          <Link
            href="/upload"
            className="rounded bg-purple-600 px-6 py-2.5 font-semibold text-white text-center transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black md:px-8 md:py-3"
            aria-label="Upload your story"
          >
            Upload Your Story
          </Link>
        </div>
      </div>
    </section>
  );
}