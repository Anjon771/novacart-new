import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast, applyCoupon } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setSubmitted(true);
    applyCoupon('WELCOME10');
    showToast('Success! 10% coupon WELCOME10 has been unlocked for your order.', 'success');
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F7F5] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E7E7E7] text-center max-w-3xl mx-auto relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] mx-auto mb-6 shadow-2xs">
            <Mail className="w-6 h-6 stroke-[1.5]" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] mb-3">
            Get 10% Off Your First Order
          </h2>

          <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Join our community for new product drops, exclusive offers and useful finds delivered directly to your inbox. No spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto text-emerald-900 flex items-center justify-center gap-3">
              <Check className="w-5 h-5 text-[#1F7A4D] shrink-0" />
              <div className="text-left text-xs">
                <p className="font-bold">You're in! Use code <span className="underline font-mono">WELCOME10</span></p>
                <p className="text-emerald-700">Code automatically applied to your checkout cart!</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3.5 text-sm bg-white border border-[#E7E7E7] rounded-xl text-[#111111] placeholder:text-[#999999] focus:outline-hidden focus:border-[#111111] shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-sm shrink-0 flex items-center justify-center gap-2"
                >
                  <span>GET 10% OFF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-[#C94C4C] mt-2 text-left">{error}</p>
              )}

              <p className="text-[11px] text-[#888888] mt-3.5">
                By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
