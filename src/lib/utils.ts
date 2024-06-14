import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CHART_COLORS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getChartColor = (colorPaletteName: string, index: number) => {
  return CHART_COLORS[colorPaletteName][
    index % CHART_COLORS[colorPaletteName].length
  ];
};

export const getUniqueSortedArray = (arr: (string | number)[]) => {
  return Array.from(new Set(arr)).sort();
};

export const getGradientColor = (name: string, colorsNum: number) => {
  let gradient = "linear-gradient(to right";
  const unitPercent = 100 / colorsNum;
  for (let i = 0; i < colorsNum; i++) {
    gradient += `, ${CHART_COLORS[name][i]} ${unitPercent * i}% ${unitPercent * (i + 1)}% `;
  }
  return gradient + ")";
};
