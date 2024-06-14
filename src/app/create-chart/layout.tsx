import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Chart",
};

export default function ChartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1">{children}</div>;
}
