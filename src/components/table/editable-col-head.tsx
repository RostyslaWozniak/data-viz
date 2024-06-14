import { useState } from "react";
// shadcn
import { Input } from "@/components/ui/input";
// import context
import { useTableContext } from "@/context/table-context";
// type
import { type TData } from "@/types";

type EditableColHeadProps = {
  initialValue: string;
};
export const EditableColHead = ({ initialValue }: EditableColHeadProps) => {
  const [newValue, setNewValue] = useState<string>(initialValue);
  const { data, setSelectedValues, setSelectedLabel, setData } =
    useTableContext();

  const onBlur = () => {
    if (initialValue === newValue || newValue.length <= 0)
      return setNewValue(initialValue);
    if (Object.keys(data[0]).includes(newValue)) {
      setNewValue(initialValue);
      alert("Column already exists");
      return;
    }

    setSelectedValues((prevValues) => {
      return prevValues.map((value) =>
        value === initialValue ? newValue : value,
      );
    });
    setSelectedLabel((prevLabel) =>
      prevLabel === initialValue ? newValue : prevLabel,
    );
    setData((prev) => {
      const newData = prev.map((el) => {
        const newObj: TData = {};
        Object.keys(el).forEach((key) => {
          return key === initialValue
            ? (newObj[newValue] = el[key])
            : (newObj[key] = el[key]);
        });
        return newObj;
      });
      return newData;
    });
  };
  return (
    <div className="w-full">
      <Input
        type="text"
        name="column-name"
        onBlur={onBlur}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        className="w-full border-0 text-center outline-0"
      />
    </div>
  );
};
