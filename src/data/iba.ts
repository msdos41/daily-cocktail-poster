export const ibaClassificationUrls = {
  "The Unforgettables": "https://iba-world.com/cocktails/the-unforgettables/",
  "Contemporary Classics": "https://iba-world.com/cocktails/the-contemporary/",
  "New Era Drinks": "https://iba-world.com/cocktails/the-new-era/",
} as const;

export type IbaCategory = keyof typeof ibaClassificationUrls;

export function ibaCategoryUrl(category: IbaCategory): string {
  return ibaClassificationUrls[category];
}
