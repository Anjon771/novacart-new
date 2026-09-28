import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, HelpCircle, Mail, MessageSquare } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'Orders & Shipping' | 'Returns & Refunds' | 'Products & Quality' | 'Payments & Security';
}

const FAQS: FaqItem[] = [
  {
    category: 'Orders & Shipping',
    q: 'How long does shipping take to the US, CA, UK, and AU?',
    a: 'Orders are processed and dispatched within 24–48 hours. Standard tracked shipping takes 3–6 business days to the USA and UK, 4–7 business days to Canada, and 5–8 business days to Australia.'
  },
  {
    category: 'Orders & Shipping',
    q: 'How can I track my package once dispatched?',
    a: 'As soon as your package leaves our partner hub, you will receive an automatic email containing your carrier tracking link. You can also use our Track Order page anytime.'
  },
  {
    category: 'Orders & Shipping',
    q: 'Are customs duties and VAT included in the price?',
    a: 'Yes! All prices for customers in the United States, Canada, United Kingdom, and Australia include applicable customs clearance. There are zero surprise fees upon delivery.'
  },
  {
    category: 'Returns & Refunds',
    q: 'What is your 30-day return policy?',
    a: 'We offer a 100% risk-free 30-day money-back guarantee. If you are not satisfied with your purchase for any reason, reach out to support@novacart.com within 30 days of receiving your item for a prepaid return label.'
  },
  {
    category: 'Returns & Refunds',
    q: 'How quickly are refunds processed back to my card?',
    a: 'Once your return is received and inspected at our regional facility, refunds are initiated immediately and typically reflect on your bank or credit card statement in 3–5 business days.'
  },
  {
    category: 'Products & Quality',
    q: 'Are your products covered by a warranty?',
    a: 'Yes, every product sold on NovaCart comes standard with a comprehensive 1-Year Limited Replacement Warranty protecting against manufacturing defects and hardware faults.'
  },
  {
    category: 'Payments & Security',
    q: 'Which payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), as well as Shop Pay, Apple Pay, Google Pay, and PayPal.'
  },
  {
    category: 'Payments & Security',
    q: 'Is my payment information secure?',
    a: 'All transactions are encrypted with industry-standard 256-bit SSL encryption. We never store your full payment credentials on our servers.'
  }
];

export const FaqPage: React.FC = () => {
  const { showToast } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const categories = ['All', 'Orders & Shipping', 'Returns & Refunds', 'Products & Quality', 'Payments & Security'];

  const filteredFaqs = FAQS.filter((f) => {
    if (selectedCategory === 'All') return true;
    return f.category === selectedCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Message sent! Our customer care team will reply within 4 hours.', 'success');
    setContactSubject('');
    setContactMsg('');
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#F7F7F5] border-b border-[#E7E7E7] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] mx-auto mb-4">
            <HelpCircle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto font-normal">
            Everything you need to know about our global shipping, 30-day guarantees, and order fulfillment.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-12">
        
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#F7F7F5] text-[#555555] hover:bg-[#EFEFEA] hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E7E7E7] rounded-xl overflow-hidden bg-[#F7F7F5]/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#111111] hover:bg-[#F7F7F5]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#E7E7E7]/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E7E7E7] text-center max-w-2xl mx-auto">
          <MessageSquare className="w-8 h-8 text-[#111111] mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[#111111] mb-2">Still need assistance?</h3>
          <p className="text-xs text-[#666666] mb-6">
            Our support concierges are available 24 hours a day to assist with order tracking, address changes, or questions.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-3 text-left">
            <input
              type="text"
              required
              placeholder="Order Number or Topic"
              value={contactSubject}
              onChange={(e) => setContactSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black"
            />
            <textarea
              required
              rows={3}
              placeholder="How can we help you today?"
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-2xs"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
