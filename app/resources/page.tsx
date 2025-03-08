"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Lock, CreditCard } from "lucide-react";

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const freeResourcesRef = useRef<HTMLDivElement>(null);
  const premiumResourcesRef = useRef<HTMLDivElement>(null);
  const freeImageWrapperRef = useRef<HTMLDivElement>(null);
  const premiumImageWrapperRef = useRef<HTMLDivElement>(null);

  const imageNames = [
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
  ];

  const [freeImageSrc, setFreeImageSrc] = useState("/images/placeholder.jpg");
  const [premiumImageSrc, setPremiumImageSrc] = useState(
    "/images/placeholder.jpg"
  );

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    return `/images/${imageNames[randomIndex]}`;
  };

  const animateImageChange = (
    wrapperRef: React.RefObject<HTMLDivElement>,
    setSrc: (src: string) => void
  ) => {
    if (!wrapperRef.current) return;

    const image = wrapperRef.current.querySelector("img");
    if (!image) return;

    const newSrc = getRandomImage();

    gsap
      .timeline()
      .to(image, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .call(() => setSrc(newSrc)) // Update source after fade out
      .to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.inOut",
      });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial images
    setFreeImageSrc(getRandomImage());
    setPremiumImageSrc(getRandomImage());

    // Start image rotation after initial render
    const interval = setInterval(() => {
      animateImageChange(freeImageWrapperRef, setFreeImageSrc);
      animateImageChange(premiumImageWrapperRef, setPremiumImageSrc);
    }, 4000); // Change every 4 seconds

    // Page animations
    if (pageRef.current) {
      gsap.fromTo(
        ".page-header > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Free resources animations
    if (freeResourcesRef.current) {
      gsap.fromTo(
        ".free-resource-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: freeResourcesRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // Premium resources animations
    if (premiumResourcesRef.current) {
      gsap.fromTo(
        ".premium-resource-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: premiumResourcesRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // Initial fade animation
    const images = document.querySelectorAll(".fade-image");
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
          },
        }
      );
    });

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen py-20 mt-24 px-4 scroll-smooth">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="page-header text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Qabiyyee Barnootaa
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Qabeenya Barnootaa Qabiyyee barnoota Afaan Oromoo guutuu fi addaa
            daa’immanii fi ijoolleeaf qophaa’e argadhaa.
          </p>
        </div>

        {/* Free Resources Section */}
        <section ref={freeResourcesRef} id="free-book" className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Kitaabiilee Barnootaa
          </h2>
          <div className="free-resource-item glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 w-full flex justify-center">
                <div
                  ref={freeImageWrapperRef}
                  className="relative fade-image w-full max-w-[300px] aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <Image
                    src={freeImageSrc}
                    alt="Afan Oromo Learning Book"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover absolute inset-0 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="md:w-2/3 w-full">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
                  Kitaaba Dura-Bultii(for beginners) Afaan Oromoo
                </h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base text-center md:text-left">
                  Qajeelfama guutuu fi salphaa ta’e kan daa’imman barnoota Afaan
                  Oromoo isaanii ittin jalqaban. Qabiyyeen kitaaba kanaas
                </p>
                <ul className="mb-8 space-y-2 text-sm sm:text-base">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Fuula 100 ol kan qabiyyee barnootaan guutame.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Bifa fakkii adda addaan wantoota ibsaman</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Gaaffiilee shaakalli</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Qajeelfama dubbachuu sirrii</span>
                  </li>
                </ul>
                <div className="text-center md:text-left">
                  <Link
                    href="/premium/payment?price=196.99" // Pass price as query parameter
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors"
                  >
                    <CreditCard size={20} />
                    <span className="text-sm sm:text-base">
                      Kitaaba Bitachuuf
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Resources Section */}
        <section ref={premiumResourcesRef} id="premium-audio" className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Barnoota karaa sagaleen
          </h2>
          <div className="premium-resource-item glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 w-full flex justify-center">
                <div
                  ref={premiumImageWrapperRef}
                  className="relative fade-image w-full max-w-[300px] aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <Image
                    src={premiumImageSrc}
                    alt="Afan Oromo Audio Lessons"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover absolute inset-0 transition-all duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-secondary p-2 rounded-full">
                    <Lock size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 w-full">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
                  Faaruu fi meeshaalee deggersaa Sagaleedhan
                </h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base text-center md:text-left">
                  Muuxannoo daa’imni keessan Afaan Oromoo ittiin baratu
                  fooyyeffachuuf, sagaleewwan qulqullina ol'aana qaban
                  fayyadamaa. Sagaleewwan kun namoota Afaanni Oromoo afaan
                  haadhaa ta'eefin kan waraabame yoo ta'u, sirna dubbachuu
                  sirrii, dhaggeeffachuu fi haasawuu akka ijoolleen keessan
                  baratan ni gargaara.
                </p>
                <ul className="mb-8 space-y-2 text-sm sm:text-base">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Faaruu heedduu kan of keessaa qabu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Shaakallii dhaggeeffannaa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Offline itti fayyadamuuf buufachuu danda’amu</span>
                  </li>
                </ul>
                <div className="text-center md:text-left">
                  <Link
                    href="/premium/payment?price=150" // Pass price as query parameter
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors"
                  >
                    <CreditCard size={20} />
                    <span className="text-sm sm:text-base">
                      Faaruu Bitachuuf
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Info Section */}
        <div className="mt-12 glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Odeeffannoo Kaffaltiif</h3>
          <p className="text-gray-300 mb-4">
            Qabiyyeen sagalee ol’aanaa kaffaltiin booda argama. Kaffaltii
            keessan Telebirr yookiin Baankii Daldalaa Itoophiyaa (CBE)
            fayyadamuun raawwachuu ni dandeessu. Kaffaltii erga raawwattan
            booda, screenshot maallaqa ergitanii{" "}
            <a
              href="https://t.me/Kitila321"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline hover:text-blue-300 transition-all duration-300 ease-in-out hover:scale-105"
            >
              {" "}
              telegram{" "}
            </a>{" "}
            irratti nuuf ergaa . Nuti immoo daqiiqaa muraasa keessatti
            mirkaneessuun qabiyyee sagalee hunda isiniif ni ergina.
          </p>
          <div className="bg-black/30 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Gargaarsa Kaffaltii Kaffaltii irratti gargaarsa barbaadu yoo ta’e,
              <a
                href="https://t.me/Kitila321"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline hover:text-blue-300 transition-all duration-300 ease-in-out hover:scale-105"
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
