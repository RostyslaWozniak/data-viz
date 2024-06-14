import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TData } from "@/types";
import { Column } from "@tanstack/react-table";

export const FilterInputs = ({
  column,
  isNum,
}: {
  column: Column<TData>;
  isNum: boolean;
}) => {
  const columnFilterValue = column.getFilterValue();
  return (
    <>
      {isNum ? (
        <div className="flex gap-3">
          <Input
            name="min"
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value,
                old?.[1],
              ])
            }
            placeholder={`Min`}
            className={cn("rounded border px-2 text-black shadow", {
              "border-2 border-green-400": !!columnFilterValue,
            })}
          />
          <Input
            name="max"
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((prev: [number, number]) => [
                prev?.[0],
                e.target.value,
              ])
            }
            placeholder={`Max`}
            className={cn("rounded border px-2 text-black shadow", {
              "border-2 border-green-400": !!columnFilterValue,
            })}
          />
        </div>
      ) : (
        <Input
          name="search"
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${column.id}`}
          className={cn("w-full rounded border px-2 text-black shadow", {
            "w-full border-2 border-green-400": !!columnFilterValue,
          })}
        />
      )}
    </>
  );
};
