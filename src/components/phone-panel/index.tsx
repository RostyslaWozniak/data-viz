import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useChartsContext } from "@/context/charts-context";
import { CHART_COLORS, CHART_TABS } from "@/lib/constants";
import { cn, getGradientColor } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Checkboxes } from "../panel/checkboxes";
import { DownloadChart } from "../panel/download";

export const PhonePanel = () => {
  const {
    activeChart,
    colorPaletteName,
    selectedLabel,
    selectedValues,
    showInnerLabels,
    setShowInnerLabels,
    setActiveChart,
    setColorPaletteName,
  } = useChartsContext();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Charts</MenubarTrigger>
        <MenubarContent>
          {CHART_TABS.map((chart, i) => (
            <MenubarCheckboxItem
              checked={chart === activeChart}
              key={chart}
              onClick={() => setActiveChart(chart)}
            >
              {chart}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Color</MenubarTrigger>
        <MenubarContent>
          {Object.keys(CHART_COLORS).map((color, i) => (
            <MenubarCheckboxItem
              checked={color === colorPaletteName}
              key={color}
              onClick={() => setColorPaletteName(color)}
            >
              <div className="flex items-center justify-start gap-1">
                <div
                  className="h-3 w-10 rounded-sm"
                  style={{
                    backgroundImage: getGradientColor(color, 4),
                  }}
                />
                {color}
              </div>
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Tools</MenubarTrigger>
        <MenubarContent>
          <Checkboxes />
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Download</MenubarTrigger>
        <MenubarContent>
          <DownloadChart />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
