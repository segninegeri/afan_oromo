"use client";

import { useState, useEffect, useRef, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import PaymentHeader from "./PaymentHeader";
import PaymentInstructions from "./PaymentInstructions";
import PaymentForm from "./PaymentForm";
import SuccessMessage from "./SuccessMessage";

// Separate component for content that uses useSearchParams
function PaymentContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telegramUsername: "",
    amount: "",
    paymentMethod: "",
    receiptImage: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const displayPrice = price ? parseFloat(price) : 196.99;

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, amount: displayPrice.toString() }));

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
  }, [displayPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const telegramMessage = `Nagaadha! Meeshaalee barnootaa argachuuf kaffaltii barbaachisu raawwadheera.\n\nName: ${
        formData.fullName
      }\nEmail: ${formData.email}\nTelegram: ${
        formData.telegramUsername
      }\nAmount: ${formData.amount} ETB\nPayment Method: ${
        formData.paymentMethod === "telebirr" ? "Telebirr" : "Bank Transfer"
      }\n\nI've attached my payment receipt screenshot.`;

      const telegramUrl = `https://t.me/@Kitila321?text=${encodeURIComponent(
        telegramMessage
      )}`;

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
        <div className="payment-content">
          {!isSuccess ? (
            <div className="glass-panel p-8 rounded-xl">
              <PaymentHeader />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <PaymentInstructions price={displayPrice} />
                <PaymentForm
                  formData={formData}
                  setFormData={setFormData}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          ) : (
            <SuccessMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
