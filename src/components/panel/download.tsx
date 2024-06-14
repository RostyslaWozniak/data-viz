import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { DOWNLOAD_FORMAT } from "@/lib/constants";
import { Button } from "../ui/button";
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useChartsContext } from "@/context/charts-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "@/components/ui/use-toast";

export const DownloadChart = () => {
  const { activeChart, chartRef, selectedValues, selectedLabel } =
    useChartsContext();
  const [format, setFormat] = useState<string>(DOWNLOAD_FORMAT[0]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const downloadChart = () => {
    setIsPending(true);

    if (!chartRef) return console.log("Error: testHtml2canvas");
    html2canvas(chartRef.current!).then((canvas) => {
      const base64image = canvas.toDataURL(`image/${format}`);
      const a = document.createElement("a");
      a.setAttribute("download", `${activeChart}.${format}`);
      if (format === "pdf") {
        const pdf = new jsPDF("p", "px", [1600, 1600]);
        pdf.addImage(
          base64image,
          "PNG",
          15,
          15,
          chartRef.current?.offsetWidth!,
          chartRef.current?.offsetHeight!,
        );
        a.setAttribute("href", pdf.output("datauristring"));
      } else {
        a.setAttribute("href", base64image);
      }
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
    setTimeout(() => setIsPending(false), 300);
    // setTimeout(() => {
    //   toast({
    //     title: `File ${format} downloaded successfully!`,
    //     variant: "accept",
    //   });
    // }, 500);
  };

  return (
    <div className="space-y-5">
      <h3 className="hidden text-center text-2xl capitalize lg:block">
        Download Chart
      </h3>
      <div className="flex flex-col gap-5 lg:flex-row">
        <Select onValueChange={(e) => setFormat(e)} value={format}>
          <SelectTrigger className="text-center">
            <SelectValue placeholder={format} />
          </SelectTrigger>
          <SelectContent>
            {DOWNLOAD_FORMAT.map((format) => (
              <SelectItem key={format} value={format}>
                {format}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={downloadChart}
          variant="outline"
          className="w-full bg-[#0FADAA] text-white"
          disabled={
            (selectedValues.length === 0 && selectedLabel.length === 0) ||
            isPending
          }
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Download />}
        </Button>
      </div>
    </div>
  );
};
