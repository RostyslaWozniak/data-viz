import { useEffect, useState } from "react";
// import tanstack react table
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
// import shadcn ui table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditableColHead } from "./editable-col-head";
import { TableContext } from "@/context/table-context";

import { type TData } from "@/types";
import { useSkipper } from "@/hooks/useSkipper";
import MaxWidthWrapper from "../max-width-wrapper";
import ColumnTools from "./column-tools";
import { PaginationButtons, TableSizeSelect } from "./pagination";
import { cn } from "@/lib/utils";
import { defaultColumn } from "./default-column";

type DataTableProps = {
  tableData: TData[];
  selectedLabel: string;
  selectedValues: string[];
  setChartsData: React.Dispatch<React.SetStateAction<TData[]>>;
  setTableData: React.Dispatch<React.SetStateAction<TData[]>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Demo({
  tableData,
  selectedLabel,
  selectedValues,
  setChartsData,
  setTableData,
  setSelectedLabel,
  setSelectedValues,
}: DataTableProps) {
  const [data, setData] = useState(tableData);
  // State variables for column sorting and filters
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Create the columns for the table based on the data keys
  const columns = Object.keys(data[0]).map((el) => ({
    accessorKey: el,
    header: () => <EditableColHead initialValue={el} />,
  }));

  const [colHeadTypes, setColHeadTypes] = useState<{ [key: string]: string }>(
    {},
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Initialize the table using the useReactTable hook
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex,
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((prev) =>
          prev.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...prev[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    debugTable: true,
  });

  // Calculate the first and last rows of the current page
  const firstRowCurrentData =
    table.getState().pagination.pageIndex *
    table.getState().pagination.pageSize;
  const lastRowCurrentData =
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
    table.getState().pagination.pageSize;
  // Update the chart data when the pagination or sorting changes
  useEffect(() => {
    const newData = table
      .getSortedRowModel()
      .rows.slice(firstRowCurrentData, lastRowCurrentData)
      .map((el) => {
        return el.original;
      });
    setChartsData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().pagination, data]);

  useEffect(() => {
    setSorting([]);
    setColumnFilters([]);
    setData(tableData);
  }, [tableData]);

  return (
    <TableContext.Provider
      value={{
        data,
        selectedLabel,
        selectedValues,
        table,
        setChartsData,
        setData,
        setSelectedLabel,
        setSelectedValues,
      }}
    >
      <MaxWidthWrapper className="relative overflow-hidden rounded-xl bg-white px-0 shadow-xl md:px-0">
        <Table>
          <TableHeader>
            {/* Render the table header rows */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border p-2">
                    <ColumnTools
                      value={
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        ) as string
                      }
                      column={header.column}
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Render the table body rows */}
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, colIndex) => {
                  const indexesValues = selectedValues.map((col) =>
                    Object.keys(data[0]).findIndex((el) => el === col),
                  );
                  const indexLabel = Object.keys(data[0]).findIndex(
                    (el) => el === selectedLabel,
                  );

                  return (
                    <TableCell
                      key={cell.id}
                      className={cn("border-b-2 p-0 text-center", {
                        "border-b-green-400 bg-green-400/10":
                          indexesValues.includes(colIndex),
                        "border-b-red-400 bg-red-400/10":
                          indexLabel === colIndex,
                      })}
                    >
                      {colHeadTypes[cell.column.id] === "number"
                        ? (flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          ) as number)
                        : (flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          ) as string)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Render the table size select and pagination buttons */}
        <div className="flex items-center justify-between px-5 sm:flex-row">
          <TableSizeSelect />
          <PaginationButtons />
        </div>
      </MaxWidthWrapper>
    </TableContext.Provider>
  );
}
