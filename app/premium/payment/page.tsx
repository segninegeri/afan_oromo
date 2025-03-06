"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { CheckCircle, ArrowLeft, Upload, Send } from "lucide-react";

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telegramUsername: "",
    amount: "",
    paymentMethod: "",
    receiptImage: null as File | null, // Change this line
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page animations
    if (pageRef.current) {
      gsap.fromTo(
        ".payment-content > *",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, receiptImage: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in a real scenario, this would open Telegram
    try {
      // Simulate a delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Open Telegram with a pre-filled message
      const telegramMessage = `Nagaadha! Meeshaalee barnootaa argachuuf kaffaltii barbaachisu raawwadheera.\n\nName: ${
        formData.fullName
      }\nEmail: ${formData.email}\nTelegram: ${
        formData.telegramUsername
      }\nAmount: ${formData.amount} ETB\nPayment Method: ${
        formData.paymentMethod === "telebirr" ? "Telebirr" : "Bank Transfer"
      }\n\nI've attached my payment receipt screenshot.`;

      // Create a telegram URL - this will open the telegram app or web version
      const telegramUrl = `https://t.me/@Kitila321?text=${encodeURIComponent(
        telegramMessage
      )}`;

      // Open telegram in a new tab
      window.open(telegramUrl, "_blank");

      setIsSuccess(true);
    } catch (error) {
      console.error("Payment verification failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen py-20 mt-24 px-4 smooth-scroll">
      <div className="max-w-4xl mx-auto">
        {!isSuccess ? (
          <div className="payment-content">
            <Link
              href="/resources#premium-audio"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8"
            >
              <ArrowLeft size={16} />
              Gara duubatti deebi'uuf
            </Link>

            <div className="glass-panel p-8 rounded-xl">
              <h1 className="text-3xl font-bold mb-8 text-center">
                Premium Access Payment
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Payment Instructions
                  </h2>
                  <p className="text-gray-300 mb-4">
                    To access our premium audio content, please follow these
                    steps:
                  </p>

                  <ol className="space-y-4 text-gray-300">
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        1
                      </span>
                      <span>
                        Make a payment of <strong>499 ETB</strong> using one of
                        our payment methods.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <span>
                        For Telebirr: Send to <strong>+251917642034</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <span>
                        For Bank Transfer: Account Number{" "}
                        <strong>1000123456789</strong> (Commercial Bank of
                        Ethiopia)
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        4
                      </span>
                      <span>
                        Take a screenshot of your payment confirmation.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        5
                      </span>
                      <span>
                        Fill out the form with your details and upload the
                        screenshot.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        6
                      </span>
                      <span>
                        Send the information to us via Telegram and we'll
                        provide access to premium content.
                      </span>
                    </li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Payment Verification
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="mb-4">
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

                    <div className="mb-4">
                      <label
                        htmlFor="telegramUsername"
                        className="block text-sm font-medium mb-2"
                      >
                        Telegram Username
                      </label>
                      <input
                        type="text"
                        id="telegramUsername"
                        name="telegramUsername"
                        value={formData.telegramUsername}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="@your_telegram_username"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="paymentMethod"
                        className="block text-sm font-medium mb-2"
                      >
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="telebirr">Telebirr</option>
                        <option value="bank">
                          Commercial Bank of Ethiopia
                        </option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium mb-2"
                      >
                        Amount Paid (ETB)
                      </label>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter amount paid"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="receiptImage"
                        className="block text-sm font-medium mb-2"
                      >
                        Payment Screenshot/Receipt
                      </label>
                      <div className="border border-dashed border-white/30 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          id="receiptImage"
                          name="receiptImage"
                          onChange={handleFileChange}
                          required
                          className="hidden"
                          accept="image/*"
                        />
                        <label
                          htmlFor="receiptImage"
                          className="cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                          {previewUrl ? (
                            <div className="relative w-full h-40 mb-2">
                              <Image
                                src={previewUrl || "/placeholder.svg"}
                                alt="Receipt preview"
                                fill
                                className="object-contain rounded-lg"
                              />
                            </div>
                          ) : (
                            <Upload size={32} className="text-gray-400 mb-2" />
                          )}
                          <span className="text-sm text-gray-300">
                            {previewUrl
                              ? "Change image"
                              : "Click to upload payment screenshot"}
                          </span>
                          <span className="text-xs text-gray-400">
                            JPG, PNG or GIF (Max 5MB)
                          </span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                        isSubmitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-primary hover:bg-primary-dark"
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send via Telegram
                        </>
                      )}
                    </button>

                    <div className="mt-4 p-4 bg-black/30 rounded-lg">
                      <p className="text-sm text-gray-400">
                        <strong>Note:</strong> After submitting this form,
                        you'll be redirected to Telegram to send your payment
                        details. We'll verify your payment and provide access to
                        premium content within 24 hours.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="payment-content">
            <div className="glass-panel p-8 rounded-xl text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle size={80} className="text-primary" />
              </div>

              <h1 className="text-3xl font-bold mb-4">
                Payment Information Submitted!
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Thank you for your purchase. Please complete the process by
                sending your payment screenshot via Telegram.
              </p>

              <div className="glass-panel p-6 mb-8 max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-3">Next Steps:</h2>
                <ol className="text-left space-y-3 text-gray-300">
                  <li className="flex gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span>
                      Send your payment screenshot via Telegram to{" "}
                      <strong>@machiavellijg</strong>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span>
                      We'll verify your payment (usually within 24 hours)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span>
                      You'll receive access to premium content via email
                    </span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://t.me/machiavellijg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Open Telegram
                </a>

                <Link
                  href="/"
                  className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
