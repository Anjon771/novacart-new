import React from 'react';
import { DEMO_REVIEWS } from '../data/products';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center gap-1 mb-2 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111]">
            Loved by thousands of shoppers
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-normal">
            Real stories from our community across the United States, Canada, the United Kingdom, and Australia.
          </p>
          <span className="text-[11px] text-[#999999] mt-1 italic">
            *Demo verified buyer testimonials featured for storefront design evaluation
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#F7F7F5] rounded-2xl p-6 border border-[#E7E7E7] flex flex-col justify-between hover:shadow-xs transition-shadow duration-200"
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#888888]">{review.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="text-sm font-bold text-[#111111] mb-2 leading-snug">
                  "{review.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs text-[#555555] leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              {/* Bottom Info: Author & Product */}
              <div className="pt-4 border-t border-[#E7E7E7]/80 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111111]">{review.author}</span>
                  {review.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1F7A4D]">
                      <CheckCircle className="w-3 h-3 fill-[#1F7A4D] text-white" />
                      Verified Buyer
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#777777]">
                  <span className="line-clamp-1">Product: <strong className="text-[#333333] font-medium">{review.productTitle}</strong></span>
                  <span className="flex items-center gap-1 shrink-0 ml-2">
                    <ThumbsUp className="w-3 h-3" />
                    {review.helpfulCount}
                  </span>
                </div>

                <span className="text-[10px] text-[#888888]">{review.location}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
