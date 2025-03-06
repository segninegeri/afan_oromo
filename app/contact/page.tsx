"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    // Form animations
    if (formRef.current) {
      gsap.fromTo(
        ".form-element",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    // Contact info animations
    if (contactInfoRef.current) {
      gsap.fromTo(
        ".contact-info-item",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using EmailJS or a similar service would be ideal in a production environment
      // For this example, we'll use a simple mailto link approach
      const mailtoLink = `mailto:Kitilakitila05@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;

      // Open the user's email client
      window.open(mailtoLink, "_blank");

      // Set success status
      setSubmitStatus("success");

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen py-20 smooth-scroll mt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="page-header text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nu quunnamaa</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Gaafii Yookiin Yaada Qabduu? Karaa email keenyaa akkasumas
            midiyaalee hawwaasaa keenyan ergaa keessan nu biraan ga'a.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="form-element">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-element">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-element mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter subject"
                />
              </div>

              <div className="form-element mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="yaada yookin gaaffi qabdan..."
                />
              </div>

              <div className="form-element">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "btn-gradient"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Ergamaa jira...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Erguuf
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                    <p className="text-green-400">
                      Ergaan keessan milkaa'inaan nu qaqqabee jira. Galatooma!
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                    <p className="text-red-400">Irra Deebi'uun Yaalaa</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div
            ref={contactInfoRef}
            className="glass-panel p-8 rounded-xl h-fit"
          >
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
                    ></path>
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
                    ></path>
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
        </div>
      </div>
    </div>
  );
}
