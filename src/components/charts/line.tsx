import {
  CartesianGrid,
  Legend,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
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
    selectedLabel,
    selectedValues,
    showOuterLabels,
    showBrush,
  } = useChartsContext();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={CHARTS_MARGIN}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={selectedLabel} />
        <YAxis />
        <Tooltip />
        <Legend layout="horizontal" />
        {selectedValues.map((el, i) => (
          <Line
            type="monotone"
            key={i}
            dataKey={el}
            stroke={CHART_COLORS[colorPaletteName][i]}
          >
            {showOuterLabels && (
              <LabelList
                dataKey={selectedValues[i]}
                stroke="black"
                position="top"
              />
            )}
          </Line>
        ))}

        {showBrush && (
          <Brush
            dataKey={selectedLabel}
            height={30}
            stroke={"#1CBCD8"}
            travellerWidth={10}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
