import type { TheaterScreenConfig } from "./types";

type AspectRatio = { width: number; height: number };

const aspectRatios: Record<number, AspectRatio> = {
  1: { width: 300, height: 60 },
  2: { width: 300, height: 100 },
  3: { width: 320, height: 80 },
  4: { width: 300, height: 100 },
  5: { width: 320, height: 80 },
  6: { width: 300, height: 80 },
};

export function getScreenSVG({
  screenVariant,
  width,
  screenColor = "#e0e0e0",
  textColor="#000",
  screenText = "",
}: Omit<TheaterScreenConfig, "height">): string {
  const ratio = aspectRatios[screenVariant];
  if (!ratio) throw new Error("Invalid screenVariant number. Choose 1 to 6.");

  const calculatedHeight = (width * ratio.height) / ratio.width;

  switch (screenVariant) {
    case 1:
      return `
<svg width="${width}" height="${calculatedHeight}" viewBox="0 0 300 60" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="260" height="30" rx="6" fill="${screenColor}" stroke="#999" stroke-width="2"/>
  <text x="150" y="30" font-size="14" text-anchor="middle" fill="${textColor}" font-family="Arial">${screenText}</text>
</svg>`;
    case 2:
      return `
<svg width="${width}" height="${calculatedHeight}" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <polygon points="20,70 150,10 280,70" fill="${screenColor}" stroke="#888" stroke-width="2"/>
  <text x="150" y="50" font-size="16" text-anchor="middle" fill="${textColor}" font-family="Verdana">${screenText}</text>
</svg>`;
    case 3:
      return `
<svg width="${width}" height="${calculatedHeight}" viewBox="0 0 320 80" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 50 Q160 0 310 50 L310 55 Q160 5 10 55 Z" fill="${screenColor}" stroke="#aaa" stroke-width="2"/>
  <text x="160" y="40" font-size="14" text-anchor="middle" fill="${textColor}" font-family="sans-serif">${screenText}</text>
</svg>`;
    case 4:
      return `
<svg width="${width}" height="${calculatedHeight}" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="260" height="40" rx="10" fill="${screenColor}" stroke="#8e0000" stroke-width="2"/>
  <text x="150" y="47" font-size="16" text-anchor="middle" fill="${textColor}" font-family="Georgia">${screenText}</text>
</svg>`;
    case 5:
      return `
<svg width="${width}" height="${calculatedHeight}" viewBox="0 0 320 80" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="40" rx="140" ry="25" fill="${screenColor}" stroke="#555" stroke-width="2"/>
  <text x="160" y="45" font-size="15" text-anchor="middle" fill="${textColor}" font-family="Tahoma">${screenText}</text>
</svg>`;
    case 6:
      return `
<svg width="${width}" height="${calculatedHeight}" viewBox="0 0 300 80" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 60 Q150 10 290 60 L290 65 Q150 15 10 65 Z" fill="${screenColor}" stroke="#222" stroke-width="2"/>
  <text x="150" y="45" font-size="16" text-anchor="middle" fill="${textColor}" font-family="Courier New">${screenText}</text>
</svg>`;
    default:
      throw new Error("Invalid screenVariant number. Choose 1 to 6.");
  }
}
