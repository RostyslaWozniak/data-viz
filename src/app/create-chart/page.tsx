/** @format */
"use client";
import { ChartsSection } from "@/components/charts-section";
import Table from "@/components/table";
import UploadExcelFile from "@/components/upload-excel-file";
import { initialData } from "@/data";
import { TData } from "@/types";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState<TData[]>(initialData);
  const [chartsData, setChartsData] = useState<TData[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  return (
    <div className="md:bg-dotted-spacing-4 md:bg-dotted-gray-400 flex h-full flex-col md:bg-gray-50">
      <UploadExcelFile
        setData={setData}
        setSelectedLabel={setSelectedLabel}
        setSelectedValues={setSelectedValues}
      />
      <Table
        tableData={data}
        selectedLabel={selectedLabel}
        selectedValues={selectedValues}
        setChartsData={setChartsData}
        setTableData={setData}
        setSelectedLabel={setSelectedLabel}
        setSelectedValues={setSelectedValues}
      />
      <ChartsSection
        data={chartsData}
        selectedLabel={selectedLabel}
        selectedValues={selectedValues}
      />
    </div>
  );
}
