"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Barnootni kun garee umurii kamiif qophaa'e?",
    answer:
      "Barsiisni keenya addatti daa’imman umuriin isaanii waggaa 6-12 ta’aniif kan qophaa’e yoo ta’u, qabiyyee fi sochiiwwan fedhii barumsaa isaanii wajjin walsimu of keessaa qaba.",
  },
  {
    question: `Kitaabilee jiran bifa "softcopy"dhaan ni argannaa?`,
    answer: `Eeyyen! Kitaabileen keenya hunduu bifa "softcopy"dhaanis akkasumas, bifa "hardcopy"dhaanis nii jiru.`,
  },
  {
    question: "Faaruuwwan jiran akkamittan argachuu danda'a?",
    answer:
      "Kaffaltii isin irraa eegamu erga Commercial Bank of Ethiopia / TeleBirr irratti gootani booda isiniif ergama.",
  },
  {
    question:
      "Bilbila harkaa irratti website kana fayyadamuudhan barachuu nan danda'a?",
    answer:
      "Eyyen! Website keenya bilbila harkaa irrattis ta'e koompiitara irrattis fayyadamuu isin dandeessisa.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answersRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    // If clicking the same item, close it
    if (activeIndex === index) {
      gsap.to(answersRef.current[index], {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setActiveIndex(null),
      });
      return;
    }

    // If another item is open, close it first
    if (activeIndex !== null) {
      gsap.to(answersRef.current[activeIndex], {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }

    // Open the clicked item
    setActiveIndex(index);
    gsap.fromTo(
      answersRef.current[index],
      {
        height: 0,
        opacity: 0,
      },
      {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );
  };

  // Initialize refs array
  useEffect(() => {
    answersRef.current = answersRef.current.slice(0, faqs.length);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Gaaffiiwwan Irra Deddeebiin Gaafataman
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full text-left p-6 focus:outline-none hover:bg-white/5 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold pr-8">{faq.question}</h3>
                  <ChevronDown
                    size={24}
                    className={`transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                ref={(el) => {
                  answersRef.current[index] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="p-6 pt-0 text-gray-300">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
