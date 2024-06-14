import { TData } from "@/types";
import { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

type TableContextTapes = {
  data: TData[];
  selectedLabel: string;
  selectedValues: string[];
  table: Table<TData>;
  setChartsData: React.Dispatch<React.SetStateAction<TData[]>>;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TableContext = createContext({} as TableContextTapes);

export const useTableContext = () => useContext(TableContext);
