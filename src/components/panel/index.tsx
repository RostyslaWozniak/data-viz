import { StackBarBtn } from "./stack-bar-btn";
import { ChartTabs } from "./chart-tabs";
import { DownloadChart } from "./download";
import { Checkboxes } from "./checkboxes";
import { ColorsSelect } from "./colors-select";
import { useChartsContext } from "@/context/charts-context";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

/** @format */

export const Panel = () => {
  const { activeChart, isDashboardActive, selectedValues } = useChartsContext();

  return (
    <Card className="min-w-[300px] space-y-5 px-5 py-10 shadow-xl duration-300">
      <ChartTabs />
      <ColorsSelect />
      <Checkboxes />
      <div className="h-7 px-5">
        {selectedValues.length > 1 && activeChart === "bar" && <StackBarBtn />}
      </div>
      <DownloadChart />
    </Card>
  );
};
