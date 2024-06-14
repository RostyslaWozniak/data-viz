import { Checkbox } from "@/components/ui/checkbox";
import { useTableContext } from "@/context/table-context";
import { TData } from "@/types";
import { Column } from "@tanstack/react-table";

export const SelectCol = ({
  column,
  isNum,
}: {
  column: Column<TData>;
  isNum: boolean;
}) => {
  const { selectedLabel, selectedValues, setSelectedLabel, setSelectedValues } =
    useTableContext();
  return (
    <>
      {isNum ? (
        <label className="flex cursor-pointer items-center gap-1 border-r border-slate-300 pr-2">
          <span className="w-16">
            {selectedValues.length
              ? selectedValues.includes(column.id)
                ? "Remove"
                : "Add"
              : selectedValues.includes(column.id)
                ? "Remove "
                : "Select"}
          </span>
          <Checkbox
            className="h-5 w-5 data-[state=checked]:border-white data-[state=checked]:bg-green-500"
            checked={selectedValues.includes(column.id)}
            onCheckedChange={(e) =>
              e
                ? setSelectedValues((prev) => {
                    const newValues = [...prev, column.id];

                    return newValues;
                  })
                : setSelectedValues((prev) => {
                    const newValues = prev.filter(
                      (prevEl) => prevEl !== column.id,
                    );

                    return newValues;
                  })
            }
          />
        </label>
      ) : (
        <label className="flex cursor-pointer items-center gap-1 border-r border-slate-300 pr-2">
          <span className="w-16">
            {selectedLabel.includes(column.id) ? "Remove " : "Select"}
          </span>
          <Checkbox
            className="h-5 w-5 data-[state=checked]:border-white data-[state=checked]:bg-green-500"
            checked={selectedLabel.includes(column.id)}
            onCheckedChange={(e) => {
              e
                ? setSelectedLabel(() => {
                    const newLabel = column.id;
                    localStorage.setItem("label", JSON.stringify(newLabel));
                    return newLabel;
                  })
                : setSelectedLabel(() => {
                    const newLabel = "";

                    localStorage.setItem("label", JSON.stringify(newLabel));
                    return newLabel;
                  });
            }}
          />
        </label>
      )}
    </>
  );
};
