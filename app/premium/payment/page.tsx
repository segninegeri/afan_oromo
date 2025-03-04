"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { CreditCard, CheckCircle, ArrowLeft, Upload } from "lucide-react";

// Define the type for formData
type FormData = {
  fullName: string;
  email: string;
  transactionId: string;
  amount: string;
  date: string;
  paymentMethod: string;
  receiptImage: File | null; // Allow File or null
};

export default function PaymentPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    transactionId: "",
    amount: "499",
    date: "",
    paymentMethod: "bank",
    receiptImage: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Payment verification failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of your JSX remains unchanged
  return (
    <div ref={pageRef} className="min-h-screen py-20 px-4 smooth-scroll">
      <div className="max-w-4xl mx-auto">
        {!isSuccess ? (
          <div className="payment-content">
            <Link
              href="/resources#premium-audio"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8"
            >
              <ArrowLeft size={16} />
              Back to Resources
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
                        For Bank Transfer: Account Number{" "}
                        <strong>1000123456789</strong> (Commercial Bank of
                        Ethiopia)
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <span>
                        For Telebirr: Send to <strong>0912345678</strong>
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
                        Upload the screenshot and fill out the form with your
                        payment details.
                      </span>
                    </li>
                  </ol>

                  <div className="mt-6 flex gap-4 items-center">
                    <Image
                      src="/placeholder.svg?height=60&width=120"
                      alt="Commercial Bank of Ethiopia Logo"
                      width={120}
                      height={60}
                      className="opacity-70"
                    />
                    <Image
                      src="/placeholder.svg?height=60&width=120"
                      alt="Telebirr Logo"
                      width={120}
                      height={60}
                      className="opacity-70"
                    />
                  </div>
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
                        <option value="bank">
                          Commercial Bank of Ethiopia
                        </option>
                        <option value="telebirr">Telebirr</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="transactionId"
                        className="block text-sm font-medium mb-2"
                      >
                        Transaction ID / Receipt Number
                      </label>
                      <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter transaction ID"
                      />
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
                        htmlFor="date"
                        className="block text-sm font-medium mb-2"
                      >
                        Payment Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                          Verifying Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard size={20} />
                          Verify Payment
                        </>
                      )}
                    </button>
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
                Payment Verified Successfully!
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Thank you for your purchase. You now have access to all premium
                audio content.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/resources#premium-audio"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Access Premium Content
                </Link>

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
