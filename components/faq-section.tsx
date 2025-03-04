"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What age group is this platform designed for?",
    answer:
      "Our platform is specifically designed for children aged 6-12, with content and activities tailored to their learning needs. The interface is intuitive and engaging, with colorful visuals and interactive elements that appeal to young learners.",
  },
  {
    question: "Is the PDF book really free?",
    answer:
      "Yes! Our comprehensive Afan Oromo learning book is completely free to download and use for educational purposes. We believe in making quality educational resources accessible to all children interested in learning Afan Oromo.",
  },
  {
    question: "How do I access the premium audio content?",
    answer:
      "Premium audio content is available after payment through Commercial Bank of Ethiopia or Telebirr. Once your payment is verified with a screenshot of your transaction, you'll receive immediate access to all premium audio materials.",
  },
  {
    question: "Can I use this platform on mobile devices?",
    answer:
      "Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Children can learn Afan Oromo on any device with an internet connection, making it convenient for learning at home or on the go.",
  },
  {
    question: "How often is new content added?",
    answer:
      "We regularly update our platform with new learning materials, activities, and audio content. Premium subscribers receive monthly content updates, while our free resources are refreshed quarterly to ensure the learning experience remains engaging and up-to-date.",
  },
  {
    question: "Do you offer refunds for premium content?",
    answer:
      "We offer a 7-day satisfaction guarantee for our premium content. If you're not satisfied with the premium audio resources, please contact our support team within 7 days of purchase, and we'll process a refund according to our refund policy.",
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const answersRef = useRef<(HTMLDivElement | null)[]>([])

  const toggleFAQ = (index: number) => {
    // If clicking the same item, close it
    if (activeIndex === index) {
      gsap.to(answersRef.current[index], {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setActiveIndex(null),
      })
      return
    }

    // If another item is open, close it first
    if (activeIndex !== null) {
      gsap.to(answersRef.current[activeIndex], {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
    }

    // Open the clicked item
    setActiveIndex(index)
    gsap.fromTo(
      answersRef.current[index],
      {
        height: 0,
        opacity: 0,
      },
      {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
    )
  }

  // Initialize refs array
  useEffect(() => {
    answersRef.current = answersRef.current.slice(0, faqs.length)
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-panel rounded-xl overflow-hidden transition-all duration-300">
              <button
                className="w-full text-left p-6 focus:outline-none hover:bg-white/5 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold pr-8">{faq.question}</h3>
                  <ChevronDown
                    size={24}
                    className={`transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                ref={(el) => (answersRef.current[index] = el)}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="p-6 pt-0 text-gray-300">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

