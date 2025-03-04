"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function StackedText() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initial fade in
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    )

    // Continuous floating animation
    gsap.to(containerRef.current, {
      y: "10px",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="glass-panel px-6 py-4 rounded-xl transform transition-all duration-500 hover:scale-105"
    >
      <div className="space-y-1">
        <p className="text-xl font-medium text-primary-light whitespace-nowrap">Afaan keenya</p>
        <p className="text-xl font-medium text-primary-light whitespace-nowrap">waliin haa guddisnu</p>
      </div>
    </div>
  )
}

