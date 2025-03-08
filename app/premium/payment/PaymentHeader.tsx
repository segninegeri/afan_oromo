// app/premium/payment/PaymentHeader.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaymentHeader() {
  return (
    <>
      <Link
        href="/resources#premium-audio"
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8"
      >
        <ArrowLeft size={16} />
        Gara duubatti deebi'uuf
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Premium Access Payment
      </h1>
    </>
  );
}
