"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock, CreditCard } from "lucide-react";

const IMAGE_NAMES = [
  "photo_1_2025-03-06_16-53-57.jpg",
  "photo_2_2025-03-06_16-53-57.jpg",
  "photo_3_2025-03-06_16-53-57.jpg",
  "photo_4_2025-03-06_16-53-57.jpg",
  "photo_5_2025-03-06_16-53-57.jpg",
  "photo_6_2025-03-06_16-53-57.jpg",
  "photo_7_2025-03-06_16-53-57.jpg",
  "photo_8_2025-03-06_16-53-57.jpg",
  "photo_9_2025-03-06_16-53-57.jpg",
  "photo_10_2025-03-06_16-53-57.jpg",
  "photo_11_2025-03-06_16-53-57.jpg",
  "photo_12_2025-03-06_16-53-57.jpg",
  "photo_13_2025-03-06_16-53-57.jpg",
  "photo_14_2025-03-06_16-53-57.jpg",
  "photo_15_2025-03-06_16-53-57.jpg",
  "photo_16_2025-03-06_16-53-57.jpg",
  "photo_17_2025-03-06_16-53-57.jpg",
  "photo_18_2025-03-06_16-53-57.jpg",
  "photo_19_2025-03-06_16-53-57.jpg",
  "photo_20_2025-03-06_16-53-57.jpg",
  "photo_21_2025-03-06_16-53-57.jpg",
  "photo_22_2025-03-06_16-53-57.jpg",
  "photo_23_2025-03-06_16-53-57.jpg",
  "photo_24_2025-03-06_16-53-57.jpg",
  "photo_25_2025-03-06_16-53-57.jpg",
  "photo_26_2025-03-06_16-53-57.jpg",
  "photo_27_2025-03-06_16-53-57.jpg",
  "photo_2025-03-06_16-56-31.jpg",
  "photo_2025-03-06_16-56-36.jpg",
] as const;

const ANIMATION_CONFIG = {
  imageChangeDuration: 0.8,
  staggerDelay: 0.2,
  scrollStart: "top 70%",
  fadeDuration: 1,
} as const;

interface ResourceSectionProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageWrapperRef: React.RefObject<HTMLDivElement>;
  sectionRef: React.RefObject<HTMLDivElement>;
  price: string;
  isPremium?: boolean;
  className?: string;
}

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const freeResourcesRef = useRef<HTMLDivElement>(null);
  const premiumResourcesRef = useRef<HTMLDivElement>(null);
  const freeImageWrapperRef = useRef<HTMLDivElement>(null);
  const premiumImageWrapperRef = useRef<HTMLDivElement>(null);

  const [freeImageSrc, setFreeImageSrc] = useState("/images/placeholder.jpg");
  const [premiumImageSrc, setPremiumImageSrc] = useState(
    "/images/placeholder.jpg"
  );

  const getRandomImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * IMAGE_NAMES.length);
    return `/images/${IMAGE_NAMES[randomIndex]}`;
  }, []);

  const animateImageChange = useCallback(
    (
      wrapperRef: React.RefObject<HTMLDivElement>,
      setSrc: (src: string) => void
    ) => {
      if (!wrapperRef.current) return;
      const image = wrapperRef.current.querySelector("img");
      if (!image) return;

      gsap
        .timeline()
        .to(image, {
          opacity: 0,
          scale: 1.1,
          duration: ANIMATION_CONFIG.imageChangeDuration,
          ease: "power3.inOut",
        })
        .call(() => setSrc(getRandomImage()))
        .to(image, {
          opacity: 1,
          scale: 1,
          duration: ANIMATION_CONFIG.imageChangeDuration,
          ease: "power3.inOut",
        });
    },
    [getRandomImage]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Preload initial images
    setFreeImageSrc(getRandomImage());
    setPremiumImageSrc(getRandomImage());

    // Image rotation with performance optimization
    const interval = setInterval(() => {
      animateImageChange(freeImageWrapperRef, setFreeImageSrc);
      animateImageChange(premiumImageWrapperRef, setPremiumImageSrc);
    }, 4000);

    // Header animation
    gsap.fromTo(
      ".page-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: ANIMATION_CONFIG.staggerDelay,
        duration: ANIMATION_CONFIG.imageChangeDuration,
        ease: "power3.out",
      }
    );

    // Section animations with batch processing
    [freeResourcesRef, premiumResourcesRef].forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(
          `.${index === 0 ? "free" : "premium"}-resource-item`,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: ANIMATION_CONFIG.staggerDelay,
            duration: ANIMATION_CONFIG.imageChangeDuration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: ANIMATION_CONFIG.scrollStart,
              once: true,
            },
          }
        );
      }
    });

    // Image fade animation with batch processing
    gsap.utils.toArray<HTMLElement>(".fade-image").forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0 },
        {
          opacity: 1,
          duration: ANIMATION_CONFIG.fadeDuration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            once: true,
          },
        }
      );
    });

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animateImageChange, getRandomImage]);

  const ResourceSection: React.FC<ResourceSectionProps> = ({
    title,
    subtitle,
    description,
    features,
    imageSrc,
    imageWrapperRef,
    sectionRef,
    price,
    isPremium = false,
    className = "",
  }) => (
    <section ref={sectionRef} className={`mb-24 ${className}`}>
      <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
      <div
        className={`${
          isPremium ? "premium" : "free"
        }-resource-item glass-panel p-8 rounded-xl`}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 w-full flex justify-center">
            <div
              ref={imageWrapperRef}
              className="relative fade-image w-full max-w-[300px] aspect-[3/4] overflow-hidden rounded-lg"
            >
              <Image
                src={imageSrc}
                alt={`${title} preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover absolute inset-0 transition-all duration-300"
                priority={isPremium}
                loading={isPremium ? "eager" : "lazy"}
              />
              {isPremium && (
                <div className="absolute top-4 right-4 bg-secondary p-2 rounded-full">
                  <Lock size={20} className="text-white" />
                </div>
              )}
            </div>
          </div>
          <div className="md:w-2/3 w-full">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
              {subtitle}
            </h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base text-center md:text-left">
              {description}
            </p>
            <ul className="mb-8 space-y-2 text-sm sm:text-base">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center md:text-left">
              <Link
                href={`/premium/payment?price=${price}`}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors"
              >
                <CreditCard size={20} />
                <span className="text-sm sm:text-base">
                  {isPremium ? "Faaruu Bitachuuf" : "Kitaaba Bitachuuf"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div ref={pageRef} className="min-h-screen py-20 mt-24 px-4 scroll-smooth">
      <div className="max-w-6xl mx-auto">
        <div className="page-header text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Qabiyyee Barnootaa
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Qabeenya Barnootaa Qabiyyee barnoota Afaan Oromoo guutuu fi addaa
            daa’immanii fi ijoolleeaf qophaa’e argadhaa.
          </p>
        </div>

        <ResourceSection
          title="Kitaabiilee Barnootaa"
          subtitle="Kitaaba Dura-Bultii(for beginners) Afaan Oromoo"
          description="Qajeelfama guutuu fi salphaa ta’e kan daa’imman barnoota Afaan Oromoo isaanii ittin jalqaban. Qabiyyeen kitaaba kanaas"
          features={[
            "Fuula 100 ol kan qabiyyee barnootaan guutame.",
            "Bifa fakkii adda addaan wantoota ibsaman",
            "Gaaffiilee shaakalli",
            "Qajeelfama dubbachuu sirrii",
          ]}
          imageSrc={freeImageSrc}
          imageWrapperRef={freeImageWrapperRef}
          sectionRef={freeResourcesRef}
          price="196.99"
          className="free-resource-section"
        />

        <ResourceSection
          title="Barnoota karaa sagaleen"
          subtitle="Faaruu fi meeshaalee deggersaa Sagaleedhan"
          description="Muuxannoo daa’imni keessan Afaan Oromoo ittiin baratu fooyyeffachuuf, sagaleewwan qulqullina ol'aana qaban fayyadamaa..."
          features={[
            "Faaruu heedduu kan of keessaa qabu",
            "Shaakallii dhaggeeffannaa",
            "Offline itti fayyadamuuf buufachuu danda’amu",
          ]}
          imageSrc={premiumImageSrc}
          imageWrapperRef={premiumImageWrapperRef}
          sectionRef={premiumResourcesRef}
          price="150"
          isPremium
          className="premium-resource-section"
        />

        <div className="mt-12 glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Odeeffannoo Kaffaltiif</h3>
          <p className="text-gray-300 mb-4">
            Qabiyyeen sagalee ol’aanaa kaffaltiin booda argama. Kaffaltii
            keessan Telebirr yookiin Baankii Daldalaa Itoophiyaa (CBE)
            fayyadamuun raawwachuu ni dandeessu...
          </p>
          <div className="bg-black/30 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Gargaarsa Kaffaltii Kaffaltii irratti gargaarsa barbaadu yoo ta’e,
              <a
                href="https://t.me/Kitila321"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {" "}
                garee deeggarsa{" "}
              </a>
              keenyaa qunnamaa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
