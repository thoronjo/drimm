export default function HeroSection() {
  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      <img 
        src="https://placehold.co/1920x1080/1a1a1a/white?text=AI+Stories+From+Around+The+World"
        alt="Hero"
        className="h-full w-full object-cover"
      />
      
      <div className="absolute bottom-20 left-12 z-20 max-w-2xl">
        <h1 className="mb-4 text-6xl font-bold text-white">
          Where AI Storytellers Share Their Visions
        </h1>
        <p className="mb-6 text-xl text-gray-200">
          Myths, histories, and futures from every corner of the world. 
          From ancient kingdoms to distant galaxies.
        </p>
        <div className="flex gap-4">
          <button className="rounded bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200">
            Explore Stories
          </button>
          <button className="rounded bg-purple-600 px-8 py-3 font-semibold text-white transition hover:bg-purple-700">
            Upload Your Story
          </button>
        </div>
      </div>
    </div>
  );
}