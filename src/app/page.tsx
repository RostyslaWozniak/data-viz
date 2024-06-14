/** @format */

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import H2 from "@/components/ui/h2";
import H3 from "@/components/ui/h3";
import Text from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { ArrowRightIcon, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const whyUsData = [
  {
    title: "Easy Upload and Dynamic Table Generation",
    subTitle: "Instantly Generate Sortable and Filterable Tables",
    text: "Simply upload your Excel file, and watch as our platform instantly generates a table with the ability to sort and filter your data. No more tedious data management – focus on the insights that matter most.",
  },
  {
    title: "Select, Customize, and Visualize",
    subTitle: "Choose Your Data and Chart Type with Ease",
    text: "Select the columns you want to visualize, choose from a variety of chart types including bar, line, pie, scatter, and radar, and customize your chart to fit your needs. Rename chart headers, adjust label positions, and apply your favorite color palette for a personal touch.",
  },
  {
    title: "Interactive and User-Friendly Features",
    subTitle: "Enhance Your Visualizations with Advanced Tools",
    text: "Utilize the brush tool to select specific ranges in your charts, ensuring you focus on the most relevant data. Our intuitive interface makes data exploration and visualization simple and engaging.",
  },
  {
    title: "Download and Share Your Insights",
    subTitle: "Export Your Charts in Multiple Formats",
    text: "Once your chart is perfect, download it in PNG, JPG, or PDF format with a single click. Share your visual insights with colleagues, clients, or your audience seamlessly.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="min-h-screen overflow-hidden bg-gradient-to-r from-secondary/30 to-primary/20">
        <MaxWidthWrapper className="text-dark relative flex flex-col items-center justify-between px-10 py-20 lg:h-screen lg:flex-row">
          <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="relative mt-16 w-fit text-balance text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-6xl">
              Transform Your Data into Stunning
              <br />
              <span className="rounded-sm bg-primary px-2 leading-normal text-white">
                Visuals Effortlessly
              </span>
            </h1>
            <ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
              <div className="space-y-2">
                <li className="flex items-center gap-1.5 text-left">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  Easy Upload and Dynamic Table Generation
                </li>
                <li className="flex items-center gap-1.5 text-left">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  Select, Customize, and Visualize
                </li>
                <li className="flex items-center gap-1.5 text-left">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  Download and Share Your Insights
                </li>
              </div>
            </ul>
            <div className="mt-8">
              <Link
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group space-x-5 px-10 py-6 text-xl",
                )}
                href={ROUTES.charts}
              >
                <span>Try It Now </span>
                <ArrowRightIcon className="duration-300 group-hover:translate-x-3" />
              </Link>
            </div>
          </div>
          <div className="relative h-full min-h-[400px] min-w-[450px] lg:min-h-[700px]">
            <Image
              width={800}
              height={500}
              src="/hero-img.png"
              alt="background image"
              className="absolute top-1/2 min-w-full -translate-y-1/3 sm:-right-40 sm:min-w-[800px] lg:-translate-y-1/4"
            />
          </div>
        </MaxWidthWrapper>
      </section>
      {/* second section */}
      <section className="bg-dotted-spacing-4 bg-dotted-gray-200">
        <MaxWidthWrapper>
          <p className="text-balance py-20 text-center text-2xl md:text-wrap md:text-3xl lg:pr-10">
            Welcome to our data visualization platform, where turning your data
            into beautiful, insightful charts is just a few clicks away. Whether
            you&apos;re a business professional, educator, or data enthusiast,
            our tool simplifies the process of creating interactive and
            customizable visualizations from your{" "}
            <span className="rounded-sm bg-primary px-1 text-white">
              Excel files
            </span>
            .
          </p>
        </MaxWidthWrapper>
      </section>
      {/*Why us */}
      <section className="bg-dotted-spacing-4 bg-dotted-gray-200 overflow-x-hidden md:space-y-20 md:py-40">
        <H2 bg>Why Choose Our Platform</H2>

        {whyUsData.map(({ title, text }, i) => (
          <div key={i} className="relative mx-auto max-w-[1300px]">
            <MaxWidthWrapper
              className={cn(
                "flex flex-col items-center justify-between gap-12 pb-10 pt-20 lg:flex-row",
                {
                  "lg:flex-row-reverse": i % 2 === 0,
                  "": i + 1 !== whyUsData.length,
                },
              )}
            >
              <div className="max-w-[600px] space-y-5 lg:max-w-[50%]">
                <H3 className="text-start">{title}</H3>
                <Text>{text}</Text>
              </div>
              <div className="max-w-[600px]">
                <Image
                  width={600}
                  height={300}
                  src={`/img-${i + 1}.png`}
                  alt={`image ${title}`}
                  className="w-full rounded-xl border-2 border-slate-500 bg-white shadow-xl"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-slate-400" />
            </MaxWidthWrapper>
          </div>
        ))}
      </section>

      {/* CTA*/}
      <section className="bg-dotted-spacing-4 bg-dotted-slate-300 bg-primary">
        <MaxWidthWrapper className="z-20 mx-auto flex w-full flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Get Started Today
          </h2>
          <Text className="mt-6 max-w-prose text-center text-2xl text-white md:text-wrap lg:pr-10">
            Experience the power of{" "}
            <span className="rounded-sm bg-gray-800 px-1 text-white">
              data visualization
            </span>
            . Sign up for free and start transforming your data into actionable
            insights today!
          </Text>

          <div className="mt-12">
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group space-x-5 px-10 py-6 text-xl",
              )}
              href={ROUTES.charts}
            >
              Upload Your Data Now
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
