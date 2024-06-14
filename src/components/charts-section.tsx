import { useState, useRef } from "react";
import { PanelLeftClose, SidebarOpenIcon } from "lucide-react";
import { type TCharts, type TData } from "@/types";
import { ChartsContext } from "@/context/charts-context";
import Charts from "@/components/charts";
import { Panel } from "@/components/panel";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { CHART_COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PhonePanel } from "./phone-panel";

type ChartsSectionProps = {
  data: TData[];
  selectedLabel: string;
  selectedValues: string[];
};
export const ChartsSection = ({
  data,
  selectedLabel,
  selectedValues,
}: ChartsSectionProps) => {
  const [activeChart, setActiveChart] = useState<TCharts>("bar");
  const [colorPaletteName, setColorPaletteName] = useState<string>(
    Object.keys(CHART_COLORS)[0],
  );
  const [isBarStack, setIsBarStack] = useState<boolean>(false);
  const [showInnerLabels, setShowInnerLabels] = useState<boolean>(false);
  const [showOuterLabels, setShowOuterLabels] = useState<boolean>(true);
  const [showBrush, setShowBrush] = useState<boolean>(false);
  // slide dashboard for mobile
  const [isDashboardActive, setIsDashboardActive] = useState<boolean>(false);

  const chartRef = useRef<HTMLDivElement | null>(null);
  return (
    <ChartsContext.Provider
      value={{
        activeChart,
        colorPaletteName,
        chartRef,
        data,
        isBarStack,
        isDashboardActive,
        selectedLabel,
        selectedValues,
        showBrush,
        showInnerLabels,
        showOuterLabels,
        setActiveChart,
        setColorPaletteName,
        setIsBarStack,
        setIsDashboardActive,
        setShowBrush,
        setShowInnerLabels,
        setShowOuterLabels,
      }}
    >
      <div className="py-20">
        <MaxWidthWrapper className="flex flex-col items-center justify-between gap-10 px-0 md:px-0 lg:flex-row lg:items-end">
          <div className="hidden lg:block">
            <Panel />
          </div>
          <div className="block lg:hidden">
            <PhonePanel />
          </div>
          <div className="min-h-[600px] w-full">
            <Charts />
          </div>
        </MaxWidthWrapper>
      </div>
    </ChartsContext.Provider>
  );
};
