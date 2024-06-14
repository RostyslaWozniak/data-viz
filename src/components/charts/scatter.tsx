import { useChartsContext } from "@/context/charts-context";
import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  ZAxis,
} from "recharts";
import { CustomLegend } from "./legend";
import { CustomTooltip } from "./tooltip";
import { getChartColor } from "@/lib/utils";
import { CHARTS_MARGIN } from "./utils";

export default function Demo() {
  const {
    colorPaletteName,
    data,
    selectedLabel,
    selectedValues,
    showOuterLabels,
  } = useChartsContext();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const uniqueLabelValues = Array.from(
    new Set(data.map((el) => el[selectedLabel])),
  ).sort();
  if (selectedValues.length >= 3)
    return (
      <h2 className="w-full self-center text-center text-3xl capitalize">
        Select max two values for showing scatter chart
      </h2>
    );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={CHARTS_MARGIN}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey={selectedValues[0]}
          name={selectedValues[0]}
        />
        <YAxis
          type="number"
          dataKey={
            selectedValues.length > 1 ? selectedValues[1] : selectedValues[0]
          }
          name={
            selectedValues.length > 1 ? selectedValues[1] : selectedValues[0]
          }
        />
        <ZAxis type="number" range={[200]} name={selectedLabel} />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend setActiveItem={setActiveItem} />} />

        {uniqueLabelValues.map((val, i) => (
          <Scatter
            key={i}
            name={val as string}
            data={data.filter((el) => el[selectedLabel] === val)}
            fill={
              activeItem === val ? "red" : getChartColor(colorPaletteName, i)
            }
            line={{ strokeWidth: activeItem === val ? 0.5 : 0 }}
          >
            {(activeItem === val || showOuterLabels) && (
              <LabelList dataKey={selectedLabel} position="top" />
            )}
          </Scatter>
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
