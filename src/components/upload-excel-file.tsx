import { Dispatch, SetStateAction, useState } from "react";
//
import * as XLSX from "xlsx";
// shadcn import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// type import
import { type TData } from "@/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type UploadExcelFileProps = {
  setData: Dispatch<SetStateAction<TData[]>>;
  setSelectedLabel: Dispatch<SetStateAction<string>>;
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
};
export default function UploadExcelFile({
  setData,
  setSelectedLabel,
  setSelectedValues,
}: UploadExcelFileProps) {
  const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<null | string>(null);

  const { toast } = useToast();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Accepted file types
    const acceptedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    // Selected file
    const selectedFile = e.target.files?.[0];
    // Check if file and type is accepted
    if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
      // Reset type error
      setTypeError(null);
      // Create file reader
      const reader = new FileReader();
      // Handle on load event
      reader.onload = (e) => {
        // If target result exists, set excel file
        if (e.target?.result) {
          setExcelFile(e.target.result);
        }
      };
      // Read file as array buffer
      reader.readAsArrayBuffer(selectedFile);
    } else {
      // Set type error
      setTypeError("Please select only excel file types");
      // Set excel file to null
      setExcelFile(null);
    }
  };

  // TODO DATE ISSUE
  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevent default form submit behavior

    // Check if excelFile is not null
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, {
        type: "array",
        // cellDates: true,
      }); // Read excel file
      const options = {
        raw: false,
        dateNF: "dd-mm-yyy", // Specify the date format string here
      };

      const worksheetName = workbook.SheetNames[0]; // Get worksheet name
      const worksheet = workbook.Sheets[worksheetName]; // Get worksheet
      const data: Array<{ [key: string]: number | string }> =
        XLSX.utils.sheet_to_json(worksheet, options); // Convert worksheet to JSON;
      setSelectedLabel("");
      setSelectedValues([]);
      setData(data);
      toast({
        title: "File uploaded successfully!",
        variant: "accept",
      });
    }
  };

  return (
    <section className="flex items-center justify-center pb-20 pt-40">
      <form
        className="flex flex-col items-center gap-3 md:flex-row"
        onSubmit={handleFileSubmit}
      >
        <div className="relative h-14">
          <Input
            type="file"
            onChange={handleFileInput}
            className={cn("border-2 border-slate-400 shadow-md", {
              "border-destructive text-destructive": typeError,
              "border-primary text-destructive text-slate-500": excelFile,
            })}
          />
          {typeError && (
            <p className="absolute text-sm text-destructive md:px-5">
              {typeError}
            </p>
          )}
        </div>
        <Button
          className="w-full shadow-md md:w-min md:self-start"
          disabled={excelFile == null}
        >
          Upload
        </Button>
      </form>
    </section>
  );
}
