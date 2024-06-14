import { useChartsContext } from "@/context/charts-context";
import { CHART_COLORS } from "@/lib/constants";

export const CustomLegend = ({
  payload,
  setActiveItem,
}: {
  payload?: any;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { colorPaletteName, data, selectedLabel } = useChartsContext();
  const uniqueLabelValues = Array.from(
    new Set(data.map((el) => el[selectedLabel] as string)),
  ).sort();

  return (
    <div className="mx-5 mt-10 flex flex-wrap justify-center gap-x-10">
      {uniqueLabelValues.map((el, i) => {
        return (
          <div
            onMouseOver={() => setActiveItem(el)}
            onMouseLeave={() => setActiveItem(null)}
            key={i}
            className="flex items-center gap-3"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  CHART_COLORS[colorPaletteName][
                    i % CHART_COLORS[colorPaletteName].length
                  ],
              }}
            />
            <p className="">{el}</p>
          </div>
        );
      })}
    </div>
  );
};
