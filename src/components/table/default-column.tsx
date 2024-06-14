import { TData } from "@/types";
import { ColumnDef, TableMeta, RowData } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: string | number,
    ) => void;
  }
}

// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<TData>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value as string | number);
    };

    // If the initialValue is changed external, sync it up with our state
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Input
        className="h-10 w-full rounded-none bg-transparent p-1 text-center"
        type={typeof initialValue}
        value={value as string}
        onChange={(e) =>
          setValue(
            typeof initialValue === "number"
              ? Number(e.target.value)
              : e.target.value,
          )
        }
        onBlur={onBlur}
      />
    );
  },
};
