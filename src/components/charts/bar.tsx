import { useMemo } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  LabelList,
} from "recharts";
import { CHART_COLORS } from "@/lib/constants";
import { useChartsContext } from "@/context/charts-context";
import { CHARTS_MARGIN } from "./utils";

export default function Demo() {
  const {
    colorPaletteName,
    data,
    isBarStack,
    selectedLabel,
    selectedValues,
    showBrush,
    showInnerLabels,
    showOuterLabels,
  } = useChartsContext();

  const index = useMemo(() => {
    const maxNumbers = selectedValues.map((label, i) =>
      Math.max(...data.map((el) => Number(el[label]))),
    );
    return maxNumbers.findIndex((num) => num === Math.max(...maxNumbers));
  }, [data, selectedValues]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={CHARTS_MARGIN}>
        <YAxis dataKey={selectedValues[index]} />
        <XAxis dataKey={selectedLabel} />
        <ReferenceLine y={0} stroke="#000" />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="5 5" />
        {selectedValues.map((el, i) => (
          <Bar
            key={i}
            dataKey={el}
            fill={CHART_COLORS[colorPaletteName][i]}
            stackId={isBarStack ? "a" : undefined}
            activeBar={
              <Rectangle
                className="bg-red"
                fill={`${CHART_COLORS[colorPaletteName][i]}60`}
                stroke="black"
              />
            }
          >
            {showOuterLabels && (
              <LabelList
                dataKey={selectedValues[i]}
                stroke="black"
                position="top"
              />
            )}
            {showInnerLabels && (
              <LabelList
                dataKey={selectedValues[i]}
                stroke="white"
                position="middle"
              />
            )}
          </Bar>
        ))}
        {showBrush && (
          <Brush
            dataKey={selectedLabel}
            height={30}
            stroke={CHART_COLORS[colorPaletteName][0]}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
