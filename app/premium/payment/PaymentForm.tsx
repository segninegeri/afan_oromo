// app/premium/payment/PaymentForm.tsx
import type React from "react";
import Image from "next/image";
import { Upload, Send } from "lucide-react";

interface PaymentFormProps {
  formData: {
    fullName: string;
    email: string;
    telegramUsername: string;
    amount: string;
    paymentMethod: string;
    receiptImage: File | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      telegramUsername: string;
      amount: string;
      paymentMethod: string;
      receiptImage: File | null;
    }>
  >;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function PaymentForm({
  formData,
  setFormData,
  previewUrl,
  setPreviewUrl,
  isSubmitting,
  handleSubmit,
}: PaymentFormProps) {
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
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
          <label htmlFor="email" className="block text-sm font-medium mb-2">
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
            <option value="telebirr">Telebirr</option>
            <option value="bank">Commercial Bank of Ethiopia</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
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
            <strong>Note:</strong> After submitting this form, you'll be
            redirected to Telegram to send your payment details. We'll verify
            your payment and provide access to premium content within 24 hours.
          </p>
        </div>
      </form>
    </div>
  );
}
