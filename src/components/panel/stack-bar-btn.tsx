import { useChartsContext } from "@/context/charts-context";
import { cn } from "@/lib/utils";

export const StackBarBtn = () => {
  const { isBarStack, setIsBarStack } = useChartsContext();
  return (
    <div
      className="relative mx-auto flex h-full w-full rounded-lg border"
      onClick={() => setIsBarStack((prev) => !prev)}
    >
      <div
        className={cn(
          "absolute z-10 h-full w-1/2 rounded-lg bg-primary duration-300",
          {
            "left-0": !isBarStack,
            "left-[100%] -translate-x-[100%]": isBarStack,
          },
        )}
      />
      <button
        className={cn("z-20 h-full w-1/2 duration-300", {
          "text-white": !isBarStack,
        })}
      >
        Columns
      </button>
      <button
        className={cn("z-20 h-full w-1/2 duration-300", {
          "text-white": isBarStack,
        })}
      >
        Stacks
      </button>
    </div>
  );
};
