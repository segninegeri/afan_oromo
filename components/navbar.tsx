"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

// Types
type NavLink = { href: string; label: string };

// Constants
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

// Main Navbar Component
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY < 50 || scrollY > 600);
    setHasScrolled(scrollY > 600);
  }, []);

  // Animation handlers
  const animateMenu = useCallback((open: boolean) => {
    const menu = menuRef.current;
    if (!menu) return;

    if (open) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "100vh", opacity: 1, duration: 0.5, ease: "power3.inOut" }
      );
      gsap.fromTo(
        ".menu-item",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(".menu-item", {
        y: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
        delay: 0.2,
        onComplete: () => setIsMenuOpen(false),
      });
    }
  }, []);

  // Toggle menu handler
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      animateMenu(!prev);
      return !prev;
    });
  }, [animateMenu]);

  // Effects
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen, toggleMenu]);

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ease-in-out
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
      >
        <div
          className={`w-full rounded-3xl transition-all duration-300
            ${
              hasScrolled
                ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg"
                : "bg-transparent"
            }`}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-primary font-clash"
            >
              Afan Oromo
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white hover:text-primary-light transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden btn-gradient p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-0 z-40 overflow-hidden
          ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="min-h-screen backdrop-blur-xl bg-black/90 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8 px-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="menu-item text-3xl font-clash font-bold text-white hover:text-primary-light transition-colors"
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}
            <div className="menu-item mt-12 pt-12 border-t border-white/10 text-center w-full max-w-xs">
              <p className="text-gray-400 mb-6">
                Afaan Oromoo Waliin haa barannu
              </p>
              <Link
                href="/resources"
                className="btn-gradient inline-flex items-center justify-center text-white px-8 py-3 rounded-lg text-lg font-medium w-full"
                onClick={toggleMenu}
              >
                Qabiyyeewwan Barnootaa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
