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
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <div ref={pageRef} className="min-h-screen py-20 px-4 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="page-header text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or feedback? Wed love to hear from you. Send us a
            message and well respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    Your Name
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
                  placeholder="Enter your message"
                />
              </div>
              <div className="form-element">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
                {submitStatus === "success" && (
                  <p className="mt-4 text-green-400">
                    Your message has been sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="mt-4 text-red-400">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
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
                  <a href="mailto:kititla@gmail.com" className="text-gray-300">
                    kititla@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-info-item flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <a className="text-gray-300" href="tel:+251925530324">
                    +251925530324
                  </a>
                </div>
              </div>
              <div className="contact-info-item flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-300">Ethiopia, Oromia</p>
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
                  href="https://www.youtube.com/@oftaateeentertement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a2.936 2.936 0 00-2.065-2.076C19.36 3.667 12 3.667 12 3.667s-7.36 0-9.433.443A2.936 2.936 0 00.502 6.186 30.372 30.372 0 000 12.001c0 1.965.162 3.91.502 5.814a2.936 2.936 0 002.065 2.076c2.073.443 9.433.443 9.433.443s7.36 0 9.433-.443a2.936 2.936 0 002.065-2.076c.34-1.904.502-3.849.502-5.814a30.372 30.372 0 00-.502-5.815zM9.546 15.568V8.434l6.272 3.567-6.272 3.567z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/@Kitila321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M21.75 3.542a1.25 1.25 0 00-1.283-.22L2.738 10.07a1.25 1.25 0 00.092 2.35l4.636 1.44 1.78 5.378a1.25 1.25 0 002.03.52l2.47-2.422 4.137 3.006a1.25 1.25 0 001.97-.793l3.001-14.543a1.25 1.25 0 00-.094-.963zM9.23 13.817L5.51 12.63l11.607-5.105-7.887 6.291zm1.385 4.124l-1.195-3.606 8.758-6.983-6.373 6.248a1.25 1.25 0 00-.372.67l-.818 3.671z" />
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
