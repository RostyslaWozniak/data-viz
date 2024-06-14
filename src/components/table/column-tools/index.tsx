import { useTableContext } from "@/context/table-context";
import { TData } from "@/types";
import { Column } from "@tanstack/react-table";
import { FilterInputs } from "./filter-inputs";
import { ArrowUpDown } from "lucide-react";
import { SelectCol } from "./select-col";

type ColumnToolsProps = {
  value: string;
  column: Column<TData>;
};

export default function ColumnTools({ value, column }: ColumnToolsProps) {
  const { table, setSelectedValues } = useTableContext();

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const isNum = !isNaN(Number(firstValue));

  return (
    <div className="flex flex-col items-center gap-3 px-2">
      <FilterInputs column={column} isNum={isNum} />
      <div className="max-w-full border-b border-t">{value}</div>
      <div className="flex w-full items-center justify-between gap-3 px-4">
        <SelectCol column={column} isNum={isNum} />
        <ArrowUpDown
          className="ml-2 h-6 w-6 cursor-pointer rounded-sm border p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    </div>
  );
}
