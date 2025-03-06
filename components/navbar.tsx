"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

// Types
interface NavLink {
  href: string;
  label: string;
}

// Navigation Links Data
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

// Navbar Component
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  // Scroll Handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsNavbarVisible(scrollY < 50 || scrollY > 600);
    setHasScrolledPastHero(scrollY > 600);
  }, []);

  // Menu Animation Functions
  const animateMenuOpen = useCallback(() => {
    gsap.fromTo(
      menuRef.current,
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
  }, []);

  const animateMenuClose = useCallback(() => {
    gsap.to(".menu-item", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
    });
    gsap.to(menuRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
      delay: 0.2,
      onComplete: () => setIsMenuOpen(false),
    });
  }, []);

  // Toggle Menu
  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      animateMenuClose();
    } else {
      setIsMenuOpen(true);
      animateMenuOpen();
    }
  }, [isMenuOpen, animateMenuOpen, animateMenuClose]);

  // Scroll Effect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Click Outside to Close Menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        animateMenuClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen, animateMenuClose]);

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95%] max-w-7xl ${
          isNavbarVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className={`w-full transition-all duration-300 rounded-3xl ${
            hasScrolledPastHero
              ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center ">
            <Link
              href="/"
              className="text-2xl font-bold text-primary font-clash"
            >
              Afan Oromo
            </Link>

            {/* Desktop Menu */}
            <DesktopMenu />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none btn-gradient p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        menuRef={menuRef}
        menuItemsRef={menuItemsRef}
        onClose={animateMenuClose}
      />
    </>
  );
}

// Desktop Menu Component
function DesktopMenu() {
  return (
    <div className="hidden md:flex items-center space-x-8 ">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-white hover:text-primary-light transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

// Mobile Menu Component
interface MobileMenuProps {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  menuItemsRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

function MobileMenu({
  isOpen,
  menuRef,
  menuItemsRef,
  onClose,
}: MobileMenuProps) {
  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 w-full h-0 overflow-hidden z-40 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="min-h-screen w-full backdrop-blur-xl bg-black/90 flex items-center justify-center">
        <div
          ref={menuItemsRef}
          className="flex flex-col items-center justify-center space-y-8 px-4"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="menu-item text-3xl font-clash font-bold text-white hover:text-primary-light transition-colors"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <div className="menu-item mt-12 pt-12 border-t border-white/10 text-center w-full max-w-xs">
            <p className="text-gray-400 mb-6">Afaan Oromoo Waliin haa barannu</p>
            <Link
              href="/resources"
              className="btn-gradient inline-flex items-center justify-center text-white px-8 py-3 rounded-lg text-lg font-medium w-full"
              onClick={onClose}
            >
              Qabiyyeewwan Barnootaa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
