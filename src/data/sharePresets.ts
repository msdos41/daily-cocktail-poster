export type SharePresetId = "instagram-feed" | "story" | "pinterest" | "x-facebook";

export type SharePreset = {
  id: SharePresetId;
  label: string;
  description: string;
  width: number;
  height: number;
};

export const sharePresets: SharePreset[] = [
  {
    id: "instagram-feed",
    label: "Instagram / Facebook Feed",
    description: "4:5 · 1440x1800",
    width: 1440,
    height: 1800,
  },
  {
    id: "story",
    label: "Story / Reels / TikTok",
    description: "9:16 · 1080x1920",
    width: 1080,
    height: 1920,
  },
  {
    id: "pinterest",
    label: "Pinterest Pin",
    description: "2:3 · 1600x2400",
    width: 1600,
    height: 2400,
  },
  {
    id: "x-facebook",
    label: "X / Facebook Landscape",
    description: "16:9 · 1920x1080",
    width: 1920,
    height: 1080,
  },
];
