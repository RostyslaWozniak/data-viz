import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { TCharts, TData } from "@/types";

type ChartsContextTypes = {
  activeChart: TCharts;
  colorPaletteName: string;
  chartRef: MutableRefObject<HTMLDivElement | null>;
  data: TData[];
  isBarStack: boolean;
  isDashboardActive: boolean;
  selectedLabel: string;
  selectedValues: string[];
  showBrush: boolean;
  showInnerLabels: boolean;
  showOuterLabels: boolean;
  setActiveChart: Dispatch<SetStateAction<TCharts>>;
  setColorPaletteName: Dispatch<SetStateAction<string>>;
  setIsBarStack: Dispatch<SetStateAction<boolean>>;
  setIsDashboardActive: Dispatch<SetStateAction<boolean>>;
  setShowBrush: Dispatch<SetStateAction<boolean>>;
  setShowInnerLabels: Dispatch<SetStateAction<boolean>>;
  setShowOuterLabels: Dispatch<SetStateAction<boolean>>;
};
export const ChartsContext = createContext({} as ChartsContextTypes);

export const useChartsContext = () => useContext(ChartsContext);
