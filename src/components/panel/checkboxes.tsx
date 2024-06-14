import { Checkbox } from "@/components/ui/checkbox";
import { useChartsContext } from "@/context/charts-context";
import { cn } from "@/lib/utils";

export const Checkboxes = () => {
  const {
    activeChart,
    showBrush,
    showInnerLabels,
    showOuterLabels,
    setShowBrush,
    setShowInnerLabels,
    setShowOuterLabels,
  } = useChartsContext();
  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <label
        className={cn(
          "flex w-full cursor-pointer items-center gap-5 border-b",
          {
            "cursor-not-allowed opacity-50":
              activeChart === "line" || activeChart === "scatter",
          },
        )}
      >
        <Checkbox
          disabled={activeChart === "line" || activeChart === "scatter"}
          name="checkbox"
          checked={showInnerLabels}
          onCheckedChange={() => setShowInnerLabels((prev) => !prev)}
        />
        Show inner labels
      </label>

      <label className="flex w-full cursor-pointer items-center gap-5 border-b">
        <Checkbox
          className=""
          checked={showOuterLabels}
          onCheckedChange={() => setShowOuterLabels((prev) => !prev)}
        />
        Show outer labels
      </label>

      <label
        className={cn(
          "flex w-full cursor-pointer items-center gap-5 border-b",
          {
            "cursor-not-allowed opacity-50":
              activeChart !== "bar" &&
              activeChart !== "line" &&
              activeChart !== "scatter",
          },
        )}
      >
        <Checkbox
          disabled={
            activeChart !== "bar" &&
            activeChart !== "line" &&
            activeChart !== "scatter"
          }
          checked={showBrush}
          onCheckedChange={() => setShowBrush((prev) => !prev)}
        />
        Show brush
      </label>
    </div>
  );
};
