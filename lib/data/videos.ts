import { Video } from '../types';

export const videos: Video[] = [
  // African Stories
  {
    id: "1",
    title: "Anansi and the Box of Stories",
    description: "The legendary spider trickster acquires all the world's stories",
    thumbnail: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Sora",
    region: "West Africa",
    country: "Ghana",
    tags: ["folklore", "animation", "trickster"],
    category: "African Stories",
    duration: 180,
    views: 1250,
    uploadDate: "2026-02-20"
  },
  {
    id: "2",
    title: "The Kingdom of Axum",
    description: "Ancient Ethiopian empire in the age of trade and power",
    thumbnail: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Runway",
    region: "East Africa",
    country: "Ethiopia",
    tags: ["history", "empire", "ancient"],
    category: "African Stories",
    duration: 240,
    views: 980,
    uploadDate: "2026-02-19"
  },
  {
    id: "3",
    title: "Lagos 2050",
    description: "Afrofuturistic vision of Nigeria's megacity",
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Sora",
    region: "West Africa",
    country: "Nigeria",
    tags: ["afrofuturism", "sci-fi", "urban"],
    category: "Sci-Fi",
    duration: 200,
    views: 2100,
    uploadDate: "2026-02-22"
  },
  {
    id: "4",
    title: "Neon Tokyo 2099",
    description: "Cyberpunk metropolis in the age of AI",
    thumbnail: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Runway",
    region: "Asia",
    country: "Japan",
    tags: ["cyberpunk", "sci-fi", "urban"],
    category: "Sci-Fi",
    duration: 190,
    views: 3400,
    uploadDate: "2026-02-23"
  },
  {
    id: "5",
    title: "Norse Ragnarok Reimagined",
    description: "The end of days told through AI",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Pika",
    region: "Europe",
    country: "Scandinavia",
    tags: ["mythology", "epic", "norse"],
    category: "Mythology",
    duration: 300,
    views: 1800,
    uploadDate: "2026-02-21"
  },
  {
    id: "6",
    title: "Amazon Guardians",
    description: "Indigenous protectors in a mystical rainforest",
    thumbnail: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Sora",
    region: "South America",
    country: "Brazil",
    tags: ["nature", "indigenous", "fantasy"],
    category: "Nature",
    duration: 220,
    views: 1450,
    uploadDate: "2026-02-20"
  },
  {
    id: "7",
    title: "Atlantis Rising",
    description: "The lost city emerges from the depths",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Runway",
    region: "Global",
    country: "Mythical",
    tags: ["mythology", "underwater", "ancient"],
    category: "Mythology",
    duration: 280,
    views: 2600,
    uploadDate: "2026-02-18"
  },
  {
    id: "8",
    title: "Silk Road Odyssey",
    description: "Ancient trade route brought to life",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=225&fit=crop",
    videoUrl: "https://test.mp4",
    aiModel: "Sora",
    region: "Asia",
    country: "China",
    tags: ["history", "trade", "ancient"],
    category: "History",
    duration: 250,
    views: 1900,
    uploadDate: "2026-02-17"
  }
];

// Helper functions
export const getVideosByCategory = (category: Video['category']) => {
  return videos.filter(video => video.category === category);
};

export const getVideosByAIModel = (aiModel: Video['aiModel']) => {
  return videos.filter(video => video.aiModel === aiModel);
};

export const getTrendingVideos = () => {
  return [...videos].sort((a, b) => (b.views || 0) - (a.views || 0));
};