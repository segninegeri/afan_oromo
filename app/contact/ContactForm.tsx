// app/contact/ContactForm.tsx
import type React from "react";
import { Send } from "lucide-react";

interface ContactFormProps {
  formRef: React.RefObject<HTMLFormElement>;
  formData: { name: string; email: string; subject: string; message: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      subject: string;
      message: string;
    }>
  >;
  isSubmitting: boolean;
  submitStatus: null | "success" | "error";
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({
  formRef,
  formData,
  setFormData,
  isSubmitting,
  submitStatus,
  handleSubmit,
}: ContactFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass-panel p-8 rounded-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="form-element">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
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
      </div>
      <div className="form-element mb-6">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
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
        <label htmlFor="message" className="block text-sm font-medium mb-2">
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
            isSubmitting ? "bg-gray-600 cursor-not-allowed" : "btn-gradient"
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
  );
}
