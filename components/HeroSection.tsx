import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import StackedText from "@/components/stacked-text";
import { forwardRef } from "react";

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="hero-section relative min-h-screen flex items-center justify-center px-4 py-20 mt-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left hero-content">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Learn <span className="text-primary">Afan Oromo</span> in a Fun &
              Interactive Way
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              An engaging language learning platform designed specifically for
              children
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/resources"
                className="btn-gradient inline-flex items-center justify-center text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                Start Learning
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="parallax-element glass-panel p-4 md:p-6">
              <Image
                src="/images/photo_2025-02-11_14-34-05.jpg"
                alt="Afan Oromo Learning Platform"
                width={600}
                height={300}
                className="rounded-lg w-full h-auto mb-8"
              />
              <div className="absolute -right-8 bottom-0 transform translate-y-1/2">
                <StackedText />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white/70" />
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
