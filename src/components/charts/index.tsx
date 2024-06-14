import Bar from "./bar";
import Line from "./line";
import Pie from "./pie";
import Scatter from "./scatter";
import Radar from "./radar";
import { useChartsContext } from "@/context/charts-context";
import { CHART_TABS } from "@/lib/constants";
import { Card } from "../ui/card";
import { ChartHeading } from "./charts-heading";

export default function Demo() {
  const { chartRef, activeChart, selectedLabel, selectedValues } =
    useChartsContext();

  // Workaround for a warning that appears when rendering the chart components
  // and is caused by a change in the react-chartjs-2 library.
  console.error = (...args: any[]) => {
    // If the warning is about the defaultProps property, we ignore it
    if (/defaultProps/.test(args[0])) return;
    // Otherwise, we log the warning as usual
    console.error(...args);
  };
  return (
    <>
      {selectedLabel.length > 0 && selectedValues.length > 0 ? (
        <Card className="no-scrollbar flex items-center overflow-x-scroll shadow-xl">
          <div ref={chartRef} className="w-full space-y-5 py-5">
            <div className="min-w-[1000px]">
              <ChartHeading name="My Chart" />
            </div>
            <div className="flex h-[600px] min-w-[1000px] items-center justify-center">
              {activeChart === CHART_TABS[0] && <Bar />}
              {activeChart === CHART_TABS[1] && <Line />}
              {activeChart === CHART_TABS[2] && <Pie />}
              {activeChart === CHART_TABS[3] && <Scatter />}
              {activeChart === CHART_TABS[4] && <Radar />}
            </div>
          </div>
        </Card>
      ) : (
        <h2 className="my-20 h-full w-full self-center text-center text-3xl font-bold capitalize">
          Select columns to show charts
        </h2>
      )}
    </>
  );
}
