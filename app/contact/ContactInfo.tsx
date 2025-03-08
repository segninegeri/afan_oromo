// app/contact/ContactInfo.tsx
import type React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoProps {
  contactInfoRef: React.RefObject<HTMLDivElement>;
}

export default function ContactInfo({ contactInfoRef }: ContactInfoProps) {
  return (
    <div ref={contactInfoRef} className="glass-panel p-8 rounded-xl h-fit">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <div className="space-y-6">
        <div className="contact-info-item flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Mail size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <a
              href="mailto:Kitilakitila05@gmail.com"
              className="text-gray-300 hover:text-primary-light transition-colors"
            >
              Kitilakitila05@gmail.com
            </a>
          </div>
        </div>
        <div className="contact-info-item flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Phone size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Phone</h3>
            <p className="text-gray-300">
              <a href="tel:+251925530324">+251 92 553 0324</a>
            </p>
          </div>
        </div>
        <div className="contact-info-item flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <MapPin size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Location</h3>
            <p className="text-gray-300">Oromia, Ethiopia</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-white/10">
        <h3 className="font-medium mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/share/1SVawTrde5/"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://youtube.com/@oftaateeentertement?si=H-juMDPiS3aX7QYp"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M23.498 6.186a2.917 2.917 0 0 0-2.048-2.048C19.582 3.5 12 3.5 12 3.5s-7.582 0-9.45.638a2.917 2.917 0 0 0-2.048 2.048C.5 8.054.5 12 .5 12s0 3.946.638 5.814a2.917 2.917 0 0 0 2.048 2.048c1.868.638 9.45.638 9.45.638s7.582 0 9.45-.638a2.917 2.917 0 0 0 2.048-2.048C23.5 15.946 23.5 12 23.5 12s0-3.946-.502-5.814zM9.75 15.75V8.25l6.5 3.75-6.5 3.75z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="tel:+251925530324"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 10.47 10.47 0 003.32.53 1 1 0 011 1v3.5a1 1 0 01-1 1A18 18 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 10.47 10.47 0 00.53 3.32 1 1 0 01-.22 1.11l-2.2 2.2zm1.56-3.3A11.47 11.47 0 015 5H4v1a16 16 0 0014 14h1v-1a11.47 11.47 0 01-2.49-3.18l-2.2 2.2a13.053 13.053 0 01-5.29-5.29l2.2-2.2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
