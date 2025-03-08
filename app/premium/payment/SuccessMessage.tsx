// app/premium/payment/SuccessMessage.tsx
import Link from "next/link";
import { CheckCircle, Send } from "lucide-react";

export default function SuccessMessage() {
  return (
    <div className="glass-panel p-8 rounded-xl text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle size={80} className="text-primary" />
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Payment Information Submitted!
      </h1>

      <p className="text-xl text-gray-300 mb-8">
        Thank you for your purchase. Please complete the process by sending your
        payment screenshot via Telegram.
      </p>

      <div className="glass-panel p-6 mb-8 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-3">Next Steps:</h2>
        <ol className="text-left space-y-3 text-gray-300">
          <li className="flex gap-2">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              1
            </span>
            <span>
              Send your payment screenshot via{" "}
              <a
                href="https://t.me/Kitila321"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:underline break-all"
              >
                Telegram
              </a>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              2
            </span>
            <span>We'll verify your payment (usually within 24 hours)</span>
          </li>
          <li className="flex gap-2">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              3
            </span>
            <span>You'll receive access to premium content via telegram</span>
          </li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://t.me/Kitila321"
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
  );
}
