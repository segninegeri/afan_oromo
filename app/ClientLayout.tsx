"use client";

import type React from "react";
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackgroundEffects from "@/components/background-effects";

// Load Caviar Dreams locally
const caviar = localFont({
  src: [
    {
      path: "../public/fonts/CaviarDreams.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-caviar",
});

// Load Quicksand locally (adjust path if different)
const quicksand = localFont({
  src: [
    {
      path: "../public/fonts/Quicksand_Book.otf", // Replace with actual path
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-quicksand",
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caviar.variable} ${quicksand.variable}`}>
      <body
        className={`bg-black min-h-screen relative overflow-x-hidden font-caviar`}
      >
        <BackgroundEffects />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  );
}
