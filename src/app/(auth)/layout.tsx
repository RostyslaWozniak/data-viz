import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
      {children}
      <div className="hidden items-center justify-center border-l-2 bg-primary/50 lg:flex">
        <Link
          href="/"
          className="z-40 flex flex-col items-center font-semibold"
        >
          <Image src="/logo.svg" height={100} width={100} alt="Logo" />
          <h2 className="text-5xl">
            data<span className="font-bold text-white">Viz</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
