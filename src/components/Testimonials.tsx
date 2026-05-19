import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reviewsData from '../data/reviews.json';
import { FadeIn } from './Motion';

interface Review {
  client: string;
  type: string;
  testimonial: string | null;
  date: string;
  source: string;
  guid: string;
}

const reviews: Review[] = (reviewsData as Review[]).filter(
  (r) => r.testimonial && r.testimonial.trim().length > 0
);

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  } catch {
    return '';
  }
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="4.8 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= 4 ? 'text-gold' : 'text-gold/40'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const current = reviews[index];

  return (
    <section className="bg-cream py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Client Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              What Clients Are Saying
            </h2>
            <div className="flex items-center justify-center gap-3">
              <StarRating />
              <span className="text-sm text-muted font-medium">
                4.8 / 5 from {reviewsData.length} verified reviews
              </span>
            </div>
          </div>
        </FadeIn>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.guid}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="w-full"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 sm:p-10 text-center">
                  <div className="flex justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-gold/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <blockquote className="text-lg sm:text-xl text-navy leading-relaxed mb-8 max-w-3xl mx-auto">
                    “{current.testimonial}”
                  </blockquote>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-bold text-navy">{current.client}</p>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <span className="bg-gold/10 text-gold text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {current.type}
                      </span>
                      <span>&bull;</span>
                      <span>{formatDate(current.date)}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">Verified by RealSatisfied</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((r, i) => (
              <button
                key={r.guid}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-gold' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
