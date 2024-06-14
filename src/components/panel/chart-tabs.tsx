import { CHART_TABS } from "@/lib/constants";
import { Button } from "../ui/button";
import { useChartsContext } from "@/context/charts-context";
import {
  BarChart,
  LineChart,
  PieChart,
  Radar,
  ScatterChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** @format */
export const ChartTabs = () => {
  const { activeChart, selectedLabel, selectedValues, setActiveChart } =
    useChartsContext();
  const iconsSize = 50;
  const chartsIcons = [
    <BarChart
      key={CHART_TABS[0]}
      size={activeChart === CHART_TABS[0] ? iconsSize : iconsSize - 10}
      className={cn("text-slate-500 duration-300", {
        "text-primary": activeChart === CHART_TABS[0],
      })}
    />,
    <LineChart
      key="line"
      size={activeChart === CHART_TABS[1] ? iconsSize : iconsSize - 10}
      className={cn("text-slate-500 duration-300", {
        "text-primary": activeChart === CHART_TABS[1],
      })}
    />,
    <PieChart
      key="pie"
      size={activeChart === CHART_TABS[2] ? iconsSize : iconsSize - 10}
      className={cn("text-slate-500 duration-300", {
        "text-primary": activeChart === CHART_TABS[2],
      })}
    />,
    <ScatterChart
      key="scatter"
      size={activeChart === CHART_TABS[3] ? iconsSize : iconsSize - 10}
      className={cn("text-slate-500 duration-300", {
        "text-primary": activeChart === CHART_TABS[3],
      })}
    />,
    <Radar
      key="radar"
      size={activeChart === CHART_TABS[4] ? iconsSize : iconsSize - 10}
      className={cn("text-slate-500 duration-300", {
        "text-primary": activeChart === CHART_TABS[4],
      })}
    />,
  ];
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-2xl">Charts</h3>
      {CHART_TABS.map((chart, i) => (
        <div key={chart} className="flex items-center gap-3">
          <span>
            {chartsIcons[i].key === activeChart
              ? chartsIcons[i]
              : chartsIcons[i]}
          </span>

          <Button
            variant={activeChart === chart ? "default" : "outline"}
            onClick={() => setActiveChart(chart)}
            className="w-full capitalize"
            disabled={
              selectedLabel.length === 0 || selectedValues.length === 0
                ? true
                : false
            }
          >
            {chart}
          </Button>
        </div>
      ))}
    </div>
  );
};
