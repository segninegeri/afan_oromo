import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import StackedText from "@/components/stacked-text";
import { forwardRef } from "react";
import afanOromoImage from "@/public/images/cover2.jpg";

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
              <span className="text-primary">Afan Oromo</span> karaa
              bashannansiisaa fi hawwataa ta'een baradhaa
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Barnoota Afaan Oromoo bifa hawwataa ta’een qophaa'ee fi addatti
              daa’imman bifa taphaan kan barsiisu
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/resources"
                className="btn-gradient inline-flex items-center justify-center text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                Barachuuf
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="parallax-element glass-panel p-4 md:p-6">
              <Image
                src={afanOromoImage}
                alt="Afan Oromo Learning Platform"
                width={600}
                height={300}
                className="rounded-lg w-full h-auto mb-8"
                priority={true} // Optional: Prioritize loading if above the fold
              
                onError={(e) => console.error("Image failed to load", e)} // Debug errors
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
