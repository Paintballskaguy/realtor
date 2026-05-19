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

const STACK_DEPTH = 2;

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 350 : -350,
    rotateZ: direction > 0 ? 8 : -8,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    rotateZ: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -350 : 350,
    rotateZ: direction > 0 ? -8 : 8,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(newDirection);
      setIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = reviews.length - 1;
        if (next >= reviews.length) next = 0;
        return next;
      });
    },
    [isAnimating]
  );

  const next = useCallback(() => paginate(1), [paginate]);
  const prev = useCallback(() => paginate(-1), [paginate]);

  useEffect(() => {
    if (paused || isAnimating) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paused, isAnimating, paginate]);

  const activeReview = reviews[index];

  /* Background cards are the ones AFTER the active card */
  const bgIndices = Array.from({ length: STACK_DEPTH }, (_, i) =>
    (index + 1 + i) % reviews.length
  );

  return (
    <section className="bg-cream py-24 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
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
          className="relative select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card Stack */}
          <div className="relative h-[380px] sm:h-[340px]">
            {/* Background cards */}
            {bgIndices.map((reviewIdx, i) => {
              const review = reviews[reviewIdx];
              const depth = i + 1;
              return (
                <motion.div
                  key={review.guid}
                  className="absolute inset-0 rounded-2xl bg-white border border-gray-100 shadow-lg p-8 sm:p-10 text-center"
                  initial={false}
                  animate={{
                    scale: 1 - depth * 0.05,
                    y: depth * 12,
                    opacity: 1 - depth * 0.22,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 32,
                  }}
                  style={{ zIndex: 10 - depth }}
                >
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
                  <blockquote className="text-lg sm:text-xl text-navy/50 leading-relaxed mb-8 max-w-2xl mx-auto line-clamp-4">
                    “{review.testimonial}”
                  </blockquote>
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-bold text-navy/60">{review.client}</p>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <span className="bg-gold/10 text-gold text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {review.type}
                      </span>
                      <span>&bull;</span>
                      <span>{formatDate(review.date)}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">Verified by RealSatisfied</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Active card */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeReview.guid}
                className="absolute inset-0 rounded-2xl bg-white border border-gray-100 shadow-2xl p-8 sm:p-10 text-center"
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 28 },
                  opacity: { duration: 0.25 },
                  rotateZ: { type: 'spring', stiffness: 300, damping: 28 },
                  scale: { type: 'spring', stiffness: 300, damping: 28 },
                }}
                style={{ zIndex: 20 }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
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

                <blockquote className="text-lg sm:text-xl text-navy leading-relaxed mb-8 max-w-2xl mx-auto">
                  “{activeReview.testimonial}”
                </blockquote>

                <div className="flex flex-col items-center gap-1">
                  <p className="font-bold text-navy">{activeReview.client}</p>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <span className="bg-gold/10 text-gold text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {activeReview.type}
                    </span>
                    <span>&bull;</span>
                    <span>{formatDate(activeReview.date)}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">Verified by RealSatisfied</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-4 mt-10">
            <motion.button
              onClick={prev}
              aria-label="Previous review"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={next}
              aria-label="Next review"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((r, i) => (
              <button
                key={r.guid}
                onClick={() => {
                  if (isAnimating || i === index) return;
                  setDirection(i > index ? 1 : -1);
                  setIsAnimating(true);
                  setIndex(i);
                }}
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
