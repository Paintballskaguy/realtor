import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reviewsData from '../data/reviews.json';
import { agent } from '../data/agent';
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

/* Staggered fade-up for text elements inside the active card */
function StaggerItem({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const animatingRef = useRef(false);

  const paginate = useCallback((newDirection: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setDirection(newDirection);
    setIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = reviews.length - 1;
      if (next >= reviews.length) next = 0;
      return next;
    });
    setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, []);

  const next = useCallback(() => paginate(1), [paginate]);
  const prev = useCallback(() => paginate(-1), [paginate]);

  /* Auto-rotate timer — resets when index changes (manual nav) or pause toggles */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (animatingRef.current) return;
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, paginate, index]);

  /* Progress bar — resets on index change, pauses when hovered */
  useEffect(() => {
    setProgress(0);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) return 1;
        return p + 0.0167;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [paused, index]);

  const activeReview = reviews[index];

  return (
    <section className="bg-cream py-24 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold/30"
              />
              <div className="text-left">
                <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">
                  Client Reviews
                </p>
                <p className="text-xs text-muted">Verified by RealSatisfied</p>
              </div>
            </div>
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
          {/* Progress bar */}
          <div className="relative h-0.5 mb-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold rounded-full"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0 }}
            />
          </div>

          {/* Card Stack with 3D perspective */}
          <div
            className="relative h-[420px] sm:h-[380px]"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          >
            {/* Background cards — stable keys, fanned in 3D space */}
            {[1, 2, 3].map((offset) => {
              const review = reviews[(index + offset) % reviews.length];
              const isLeftFan = direction > 0;
              return (
                <div
                  key={`bg-${offset}`}
                  className="absolute inset-0 rounded-2xl bg-white border border-gray-100 shadow-lg p-8 sm:p-10 text-center"
                  style={{
                    transform: `
                      scale(${1 - offset * 0.05})
                      translateY(${offset * 12}px)
                      translateZ(${-offset * 40}px)
                      rotateY(${isLeftFan ? offset * 2 : -offset * 2}deg)
                    `,
                    opacity: 1 - offset * 0.18,
                    zIndex: 10 - offset,
                    transformStyle: 'preserve-3d',
                  }}
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
                    &ldquo;{review.testimonial}&rdquo;
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
                </div>
              );
            })}

            {/* Active card — 3D slide/flip + drag + hover lift + staggered reveal */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0 rounded-2xl bg-white border border-gray-100 shadow-2xl p-8 sm:p-10 text-center overflow-y-auto cursor-grab active:cursor-grabbing"
                initial={{
                  x: direction > 0 ? 350 : -350,
                  opacity: 0,
                  rotateY: direction > 0 ? -30 : 30,
                  rotateZ: direction > 0 ? 4 : -4,
                  scale: 0.88,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotateY: 0,
                  rotateZ: 0,
                  scale: 1,
                }}
                exit={{
                  x: direction > 0 ? -350 : 350,
                  opacity: 0,
                  rotateY: direction > 0 ? 30 : -30,
                  rotateZ: direction > 0 ? -4 : 4,
                  scale: 0.88,
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80) paginate(-1);
                  else if (info.offset.x < -80) paginate(1);
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{ zIndex: 20, transformStyle: 'preserve-3d' }}
              >
                <StaggerItem delay={0.08}>
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
                </StaggerItem>

                <StaggerItem delay={0.18} className="mb-8">
                  <blockquote className="text-lg sm:text-xl text-navy leading-relaxed max-w-2xl mx-auto">
                    &ldquo;{activeReview.testimonial}&rdquo;
                  </blockquote>
                </StaggerItem>

                <StaggerItem delay={0.28}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm font-bold border border-gold/20">
                      {activeReview.client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
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
                </StaggerItem>
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
                  if (animatingRef.current || i === index) return;
                  animatingRef.current = true;
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                  setTimeout(() => {
                    animatingRef.current = false;
                  }, 750);
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
