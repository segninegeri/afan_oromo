"use client"

import type React from "react"
import localFont from "next/font/local"
import { motion, AnimatePresence } from "framer-motion"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BackgroundEffects from "@/components/background-effects"

// Load Clash Display locally
const clash = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
})

// Load Plus Jakarta Sans from Google Fonts


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${clash.variable} `}>
      <body className={` bg-black min-h-screen relative overflow-x-hidden`}>
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
  )
}

