import {
  LabelList,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useChartsContext } from "@/context/charts-context";
import { useState } from "react";
// import { getChartColor } from "@/lib/utils";
import { CustomLegend } from "./legend";
import { CustomTooltip } from "./tooltip";
import { CHART_COLORS } from "@/lib/constants";
import { getUniqueSortedArray } from "@/lib/utils";
import { CHARTS_MARGIN } from "./utils";

export default function Demo() {
  const {
    colorPaletteName,
    data,
    selectedLabel,
    selectedValues,
    showInnerLabels,
    showOuterLabels,
  } = useChartsContext();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const getPieColor = (value: string) => {
    const test = getUniqueSortedArray(data.map((el) => el[selectedLabel]));
    const index = test.indexOf(value);
    return CHART_COLORS[colorPaletteName][index];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={CHARTS_MARGIN}>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend setActiveItem={setActiveItem} />} />
        <Pie
          data={data.sort((a, b) =>
            a[selectedLabel] > b[selectedLabel] ? 1 : -1,
          )}
          dataKey={selectedValues[0]}
          cx="50%"
          cy="50%"
          innerRadius={30}
          label={showOuterLabels}
        >
          {showInnerLabels && <LabelList dataKey={selectedValues[0]} />}
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                activeItem === entry[selectedLabel]
                  ? `${getPieColor(entry[selectedLabel] as string)}80`
                  : `${getPieColor(entry[selectedLabel] as string)}`
              }
              stroke={activeItem === entry[selectedLabel] ? "black" : "white"}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
