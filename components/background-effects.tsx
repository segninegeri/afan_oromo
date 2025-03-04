"use client";

import { useEffect, useState } from "react";

interface GradientCircle {
  id: number;
  size: number;
  top: number;
  left: number;
  hue: number;
  opacity: number;
  blur: number;
}

export default function BackgroundEffects() {
  const [gradientCircles, setGradientCircles] = useState<GradientCircle[]>([]);

  useEffect(() => {
    // Generate varied gradient circles
    const circleConfigs = [
      { top: 5, left: 20, size: 500, opacity: 0.4, blur: 150 },
      { top: 30, left: 70, size: 400, opacity: 0.3, blur: 150 },
      { top: 60, left: 30, size: 450, opacity: 0.35, blur: 150 },
      { top: 80, left: 80, size: 350, opacity: 0.25, blur: 150 },
      { top: 40, left: 90, size: 300, opacity: 0.3, blur: 150 },
      { top: 20, left: 50, size: 550, opacity: 0.2, blur: 150 },
      { top: 70, left: 10, size: 400, opacity: 0.35, blur: 150 },
      { top: 15, left: 85, size: 350, opacity: 0.3, blur: 150 },
      { top: 90, left: 40, size: 450, opacity: 0.25, blur: 150 },
      { top: 50, left: 60, size: 500, opacity: 0.3, blur: 150 },
    ];

    const newCircles = circleConfigs.map((config, index) => ({
      id: index,
      size: config.size,
      top: config.top,
      left: config.left,
      hue: 120 + Math.random() * 40, // Green hues
      opacity: config.opacity,
      blur: config.blur,
    }));

    setGradientCircles(newCircles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-black">
      {/* Gradient circles */}
      {gradientCircles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full transition-all duration-1000 ease-in-out"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            top: `${circle.top}%`,
            left: `${circle.left}%`,
            opacity: circle.opacity,
            filter: `blur(${circle.blur}px)`,
            background: `radial-gradient(circle, hsla(${circle.hue}, 80%, 30%, 1) 0%, rgba(0,0,0,0) 70%)`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
