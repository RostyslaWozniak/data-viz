// context import
import { useTableContext } from "../../context/table-context";
// import shadcn ui
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PaginationButtons = () => {
  const { table } = useTableContext();
  return (
    <div className="flex items-center space-x-2 py-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <div>
        {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};

export const TableSizeSelect = () => {
  const { table } = useTableContext();
  return (
    <Select
      value={table.getState().pagination.pageSize.toString()}
      onValueChange={(e) => table.setPageSize(Number(e))}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[5, 10, 15, 20].map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={pageSize.toString()}
              className="flex"
            >
              Show {pageSize}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
