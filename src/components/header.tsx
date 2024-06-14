/** @format */

import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";

export const Header = async () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] h-14 w-screen border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <Link href={ROUTES.home} className="z-40 flex font-semibold">
            <Image src="/logo.svg" height={50} width={50} alt="Logo" priority />
          </Link>

          <div className="flex h-full items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl={ROUTES.signIn} />
            </SignedIn>
            <SignedOut>
              <Link
                href={ROUTES.signUp}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "hover:bg-white",
                )}
              >
                Sign up
              </Link>

              <Link
                href={ROUTES.signIn}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "hover:bg-white",
                )}
              >
                Login
              </Link>
            </SignedOut>
            <div className="hidden h-8 w-px bg-zinc-200 sm:block" />

            <Link
              href={ROUTES.charts}
              className={buttonVariants({
                size: "sm",
                className: "hidden items-center gap-1 sm:flex",
              })}
            >
              Create chart
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
