import portfolioData from "../../public/assets/portfolio.json";

export type VideoAspect = "16/9" | "9/16" | "1/1";

export type PortfolioVideo = {
  id: string;
  file: string;
  title: string;
  category: string;
  aspect: VideoAspect;
  span?: "wide" | "tall" | "square" | "normal";
};

export const site = portfolioData.site;
export const stats = portfolioData.stats;
export const videos = portfolioData.videos as unknown as PortfolioVideo[];
export const categories = portfolioData.categories;
export const experience = portfolioData.experience;
export const tools = portfolioData.tools;
export const contact = portfolioData.contact;
