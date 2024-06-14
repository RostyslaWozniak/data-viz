import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

type EditHeadingInputProps = {
  name: string;
};

export function ChartHeading({ name }: EditHeadingInputProps) {
  const [edit, setEdit] = useState(false);
  const [heading, setHeading] = useState<string>(
    localStorage.getItem(name) || name,
  );

  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const input = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  const handleBlurClick = () => {
    localStorage.setItem(name, heading);
    setEdit(false);
  };

  return (
    <div className="flex justify-center">
      {edit ? (
        <Input
          ref={input}
          onBlur={handleBlurClick}
          className="block w-[400px] p-0 text-center text-3xl"
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      ) : (
        <h2
          onClick={() => setEdit(true)}
          ref={headingRef}
          className="h-10 min-w-[400px] cursor-pointer rounded-lg border border-transparent text-center text-3xl hover:border-slate-300"
        >
          {heading}
        </h2>
      )}
    </div>
  );
}
