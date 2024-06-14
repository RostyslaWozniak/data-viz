/** @format */

import { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type H2Props = {
  children: ReactNode;
  className?: string;
  bg?: boolean;
};
export default function H2({ children, className, bg = false }: H2Props) {
  return (
    <div className="relative mx-auto">
      <h2
        className={cn(
          "text-dark relative z-20 text-center text-3xl font-bold md:text-4xl",
          { "text-white": bg },
          className,
        )}
      >
        {children}
      </h2>

      {bg && (
        <div className="absolute left-1/2 top-1/2 w-[1100px]">
          <Image
            src="/paint.svg"
            alt="paint"
            width={900}
            height={20}
            className="left-1/2 top-1/2 min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
    </div>
  );
}
