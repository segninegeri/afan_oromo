import Link from "next/link";
import { useState, useEffect } from "react";

const descriptions = [
  "Afaan Oromo is spoken by over 40 million people, mainly in Ethiopia and Kenya.",
  "It belongs to the Cushitic branch of the Afroasiatic language family.",
  "The language has several dialects like Borana, Guji, and Wellega.",
  "Since the 1990s, Afaan Oromo uses a Latin-based script called Qubee.",
  "It’s an official working language in Ethiopia’s Oromia region.",
  "Afaan Oromo has a rich oral tradition with proverbs and poetry.",
  "The language features ejective consonants and a tonal system.",
  "It’s closely tied to the Oromo’s Gadaa system, a traditional governance structure.",
];

export default function Footer() {
  const [currentDescription, setCurrentDescription] = useState("");

  useEffect(() => {
    // Only runs on the client after hydration
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    setCurrentDescription(descriptions[randomIndex]);
  }, []); // Empty dependency array means it runs once on mount

  return (
    <footer className="relative z-10 m-12">
      <div className="glass-panel max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Afan Oromo Learning
            </h2>
            <p className="text-gray-300 max-w-md">
              {currentDescription || "Loading..."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Contact
                </Link>
              </li>
             
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources#free-book"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Free PDF Book
                </Link>
              </li>
              <li>
                <Link
                  href="/resources#premium-audio"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Premium Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/home#faq"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Afaan Keenya ibsituu aadaa keenyati.
            Mirgi maxxansaa kan eegame.
          </p>
        </div>
      </div>
    </footer>
  );
}
