// app/premium/payment/PaymentInstructions.tsx
import type React from "react";

interface PaymentInstructionsProps {
  price: number;
}

export default function PaymentInstructions({
  price,
}: PaymentInstructionsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
      <p className="text-gray-300 mb-4">
        To access our premium audio content, please follow these steps:
      </p>
      <ol className="space-y-4 text-gray-300">
        <li className="flex gap-2">
          <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
            1
          </span>
          <span>
            Make a payment of <strong>{price} ETB</strong> using one of our
            payment methods.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
            2
          </span>
          <span>
            For Telebirr: Send to <strong>+251 92 553 0324</strong>
          </span>
        </li>
        <li className="flex gap-2">
          <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
            3
          </span>
          <span>
            For Bank Transfer: Account Number <strong>1000147858241</strong>{" "}
            (CBE Bank)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
            4
          </span>
          <span>Take a screenshot of your payment confirmation.</span>
        </li>
        <li className="flex gap-2">
          <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
            5
          </span>
          <span>
            Fill out the form with your details and upload the screenshot.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
            6
          </span>
          <span>
            Send the information to us via Telegram and we'll provide access to
            premium content.
          </span>
        </li>
      </ol>
    </div>
  );
}
