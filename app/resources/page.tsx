"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, Lock, CreditCard } from "lucide-react"

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const freeResourcesRef = useRef<HTMLDivElement>(null)
  const premiumResourcesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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
        },
      )
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
        },
      )
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
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen py-20 px-4 mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="page-header text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our comprehensive collection of Afan Oromo learning materials
            designed specifically for children.
          </p>
        </div>

        {/* Free Resources Section */}
        <section ref={freeResourcesRef} id="free-book" className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Free Resources
          </h2>

          <div className="free-resource-item glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <Image
                  src="/images/photo_2025-02-11_14-34-05.jpg"
                  alt="Afan Oromo Learning Book"
                  width={300}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
              </div>

              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">
                  Afan Oromo Beginner Book
                </h3>
                <p className="text-gray-300 mb-6">
                  Our comprehensive beginners guide to Afan Oromo is perfect for
                  children starting their language learning journey. This
                  beautifully illustrated book covers basic vocabulary, simple
                  phrases, and fun cultural insights in an engaging format.
                </p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>100+ pages of learning content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Colorful illustrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Practice exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Pronunciation guide</span>
                  </li>
                </ul>

                <Link
                  href="/download/afan-oromo-beginners-book.pdf"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Download size={20} />
                  Download Free PDF
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Resources Section */}
        <section ref={premiumResourcesRef} id="premium-audio" className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Premium Audio Resources
          </h2>

          <div className="premium-resource-item glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative">
                  <Image
                    src="/images/photo_2025-02-11_14-34-05.jpg"
                    alt="Afan Oromo Audio Lessons"
                    width={300}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                  <div className="absolute top-4 right-4 bg-secondary p-2 rounded-full">
                    <Lock size={20} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">
                  Afan Oromo Audio Collection
                </h3>
                <p className="text-gray-300 mb-6">
                  Enhance your childs learning experience with our premium audio
                  collection. Recorded by native Afan Oromo speakers, these
                  audio lessons help develop proper pronunciation, listening
                  skills, and conversational abilities.
                </p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>50+ audio lessons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Native speaker pronunciation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Interactive listening exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Downloadable for offline use</span>
                  </li>
                </ul>

                <Link
                  href="https://t.me/@Kitila321"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <CreditCard size={20} />
                  Purchase Premium Access
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Payment Information</h3>
            <p className="text-gray-300 mb-4">
              We accept payments through Commercial Bank of Ethiopia. After
              completing your purchase, youll receive immediate access to all
              premium audio content.
            </p>
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-gray-400">
                For assistance with payment, please contact our support team at
                support@afanoromolearning.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

