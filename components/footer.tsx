import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 m-12  ">
      <div className="glass-panel max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Afan Oromo Learning
            </h2>
            <p className="text-gray-300 max-w-md">
              An interactive platform designed to help children learn the Afan
              Oromo language through engaging content and activities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/premium"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Premium Access
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources#free-book"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Free PDF Book
                </Link>
              </li>
              <li>
                <Link
                  href="/resources#premium-audio"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Premium Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/home#faq"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Afan Oromo Learning. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
