import { useChartsContext } from "@/context/charts-context";
import { CHART_COLORS } from "@/lib/constants";
import {
  Radar,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "./tooltip";
import { CustomLegend } from "./legend";
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
  if (
    Array.from(new Set(data.map((el) => el[selectedLabel]))).length !==
      data.length &&
    showOuterLabels
  )
    return (
      <h2 className="w-full self-center text-center text-3xl capitalize">
        Select columns with unique labels
      </h2>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="90%"
        data={data}
        margin={CHARTS_MARGIN}
      >
        <PolarGrid />
        {showOuterLabels && <PolarAngleAxis dataKey={selectedLabel} />}
        {showInnerLabels && (
          <PolarRadiusAxis angle={85} stroke="black" className="font-black" />
        )}
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {selectedValues.map((value, i) => (
          <Radar
            key={i}
            name={value}
            dataKey={value}
            stroke={CHART_COLORS[colorPaletteName][i]}
            fill={CHART_COLORS[colorPaletteName][i]}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
