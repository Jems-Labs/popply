import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Dot,
  Store,
  Rocket,
  BarChart,
  StretchHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="py-28">
      <div className="absolute inset-0 bg-grid-squares pointer-events-none" />
      <section className="px-6 md:px-10 relative flex flex-col items-center justify-center text-center ">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight">
            Your week long shop to sell anything
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
            Create limited-time shops. Launch in minutes. <br /> Sell for a
            week.
          </p>
          <Link href={"/login"}>
            <Button size="lg" className="group px-6 py-4 text-base md:text-lg">
              Get Started
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>

          <div className="relative mt-10">
            <div
              className="absolute inset-0 -z-10 rounded-xl blur-2xl opacity-40"
              style={{
                background: "linear-gradient(135deg, #d4d4d8 0%, #e5e5e5 100%)",
              }}
            />

            <Image
              src="/popply-ss.png"
              alt="Popply Screenshot"
              width={1000}
              height={600}
              className="rounded-xl shadow-lg border"
            />
          </div>
        </div>
      </section>
      <div className="py-10">
        <Separator />
      </div>

      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Dot /> HOW IT WORKS <Dot />
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-12">
            Launch a pop-up shop in minutes. Sell for 7 days. Get insights &
            learn faster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Your Shop",
                desc: "Pick a name, add products, customize your look — no design or code required.",
                icon: Store,
              },
              {
                title: "Launch for 7 Days",
                desc: "Instantly go live. Share your unique shop link with your audience anywhere.",
                icon: Rocket,
              },
              {
                title: "Track & Learn",
                desc: "Get real-time analytics. Understand what works. Iterate & improve.",
                icon: BarChart,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-border rounded-2xl p-6 group hover:border-primary/50 hover:shadow-lg transition duration-300 bg-background"
              >
                <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 transition">
                  <item.icon />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="py-10">
        <Separator />
      </div>
      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Dot /> FEATURES <Dot />
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl mb-10">
            Everything you need to launch, sell & track — all in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                title: "Create Shop in Minutes",
                desc: "Pick a name, customize your shop & launch instantly — no code required.",
                icon: <Store className="w-5 h-5 text-white" />,
              },
              {
                title: "Add Products Easily",
                desc: "Simple & fast product management designed for everyone.",
                icon: <StretchHorizontal className="w-5 h-5 text-white" />,
              },
              {
                title: "Shop Analytics",
                desc: "Track views, orders & revenue with real-time analytics.",
                icon: <BarChart className="w-5 h-5 text-white" />,
              },
              {
                title: "Pop Mart",
                desc: "Discover all live pop-up shops from the Popply community.",
                icon: <Rocket className="w-5 h-5 text-white" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-6 border border-border bg-background hover:shadow-xl hover:border-primary/30 transition duration-300 flex gap-10"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 transition ">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
