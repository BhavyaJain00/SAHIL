export const site = {
  name: "Sahil Lunia",
  brand: "FLUX STREAM",
  role: "Video Editor",
  tagline:
    "An Editor who has refined countless stories into impactful and engaging masterpieces",
} as const;

export const stats = [
  { value: 5, suffix: "+", label: "Years" },
  { value: 81, suffix: "+", label: "Projects" },
  { value: 4, suffix: "+", label: "Clients" },
] as const;

export type VideoAspect = "16/9" | "9/16" | "1/1";

export type PortfolioVideo = {
  id: string;
  file: string;
  title: string;
  category: string;
  aspect: VideoAspect;
  span?: "wide" | "tall" | "square" | "normal";
};

function asset(file: string) {
  return `/assets/${encodeURIComponent(file)}`;
}

export const videos: PortfolioVideo[] = [
  {
    id: "reel-1",
    file: asset("reel_1.mp4"),
    title: "Reel 01",
    category: "Trending Now",
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "kushagra-reel",
    file: asset("Kushagra B3 Script 7 reel.mp4"),
    title: "Kushagra B3 — Script 7",
    category: "Story Telling",
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "ushma-17",
    file: asset("Ushma script 17.mp4"),
    title: "Ushma — Script 17",
    category: "Story Telling",
    aspect: "16/9",
    span: "wide",
  },
  {
    id: "kushagra-8",
    file: asset("Kushagra B3 Script 8 02.mp4"),
    title: "Kushagra B3 — Script 8",
    category: "Trending Now",
    aspect: "16/9",
    span: "wide",
  },
  {
    id: "p1-16-9",
    file: asset("p 1 16-9.mp4"),
    title: "Project 1 — Cinematic",
    category: "New Releases",
    aspect: "16/9",
    span: "normal",
  },
  {
    id: "p2-9-16",
    file: asset("p _2 9-16 fix.mp4"),
    title: "Project 2 — Vertical",
    category: "Music & Vibes",
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "p1-square",
    file: asset("p-1   1-1.mp4"),
    title: "Project 1 — Square",
    category: "New Releases",
    aspect: "1/1",
    span: "square",
  },
  {
    id: "p1-9-16",
    file: asset("p-1  9-16.mp4"),
    title: "Project 1 — Promo",
    category: "Music & Vibes",
    aspect: "9/16",
    span: "tall",
  },
];

export const categories = [
  "All",
  "Trending Now",
  "New Releases",
  "Story Telling",
  "Music & Vibes",
] as const;

export const experience = {
  bio: "Video Editor with 4+ years of professional experience — YouTube, short films, ads, reels, music videos & corporate projects. Storytelling, transitions, VFX & cinematic polish.",
  offers: [
    "Cinematic editing",
    "VFX & motion graphics",
    "Reels, Shorts & TikTok",
    "On-time delivery",
  ],
} as const;

export const tools = [
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "CapCut",
  "ChatGPT",
] as const;

export const contact = [
  {
    label: "Instagram",
    value: "FLUX EDIT",
    href: "https://instagram.com",
  },
  {
    label: "Gmail",
    value: "Contact",
    href: "mailto:contact@fluxedit.com",
  },
  {
    label: "WhatsApp",
    value: "DM Only",
    href: "https://wa.me",
  },
] as const;
