import { useChartsContext } from "@/context/charts-context";
import { CHART_COLORS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getGradientColor } from "@/lib/utils";
export const ColorsSelect = () => {
  const { colorPaletteName, setColorPaletteName } = useChartsContext();

  return (
    <label className="flex w-full items-center justify-between gap-1 border-b py-2">
      Color palette:
      <Select
        onValueChange={(e) => setColorPaletteName(e)}
        value={colorPaletteName}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(CHART_COLORS).map((name, i) => (
            <SelectItem key={i} value={name}>
              <div className="flex items-center justify-start gap-1">
                <div
                  className="h-3 w-10 rounded-sm"
                  style={{
                    backgroundImage: getGradientColor(name, 4),
                  }}
                />
                {name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
};
