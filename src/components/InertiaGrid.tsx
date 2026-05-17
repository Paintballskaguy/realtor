import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import type { Listing } from '../types/listing';
import TiltCard from './TiltCard';
import { formatPrice } from '../lib/utils';

interface Props {
  listings: Listing[];
  title?: string;
  subtitle?: string;
}

export default function InertiaGrid({ listings, title = 'Featured', subtitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(springX, [-500, 500], [3, -3]);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.clientWidth;
        setDragConstraints({ left: -(scrollWidth - clientWidth), right: 0 });
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [listings]);

  const scrollBy = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollBy('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollBy('right');
    }
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            {subtitle && (
              <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">{subtitle}</p>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">{title}</h2>
          </div>
          <Link
            to="/listings"
            className="hidden sm:inline-flex items-center gap-1 text-navy font-medium hover:text-gold transition-colors group"
          >
            View all
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>

      {/* Keyboard-accessible scrollable region */}
      <div
        ref={scrollRef}
        role="region"
        aria-label="Featured listings carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="overflow-x-auto scrollbar-hide outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
      >
        <motion.div
          ref={containerRef}
          style={shouldReduceMotion ? undefined : { x: springX, rotateY }}
          drag={shouldReduceMotion ? false : 'x'}
          dragConstraints={dragConstraints}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          className="flex gap-6 px-4 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing perspective-1000"
        >
          <div className="flex-shrink-0 w-[calc((100vw-80rem)/2)] hidden lg:block" />

          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.95 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="flex-shrink-0 w-[320px] sm:w-[380px]"
            >
              <TiltCard className="group h-full" tiltAmount={8}>
                <Link
                  to={`/listings/${listing.id}`}
                  className="block h-full rounded-2xl bg-surface border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={listing.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-navy/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {listing.featured ? 'Featured' : 'For Sale'}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-4">
                      <p className="text-white font-bold text-lg">{formatPrice(listing.price)}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-navy group-hover:text-gold transition-colors truncate">
                      {listing.address}
                    </h3>
                    <p className="text-sm text-muted mb-3">
                      {listing.city}, {listing.state} {listing.zip}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-navy">
                      <span className="bg-gray-50 px-2.5 py-1 rounded-md font-medium">{listing.beds} beds</span>
                      <span className="bg-gray-50 px-2.5 py-1 rounded-md font-medium">{listing.baths} baths</span>
                      <span className="bg-gray-50 px-2.5 py-1 rounded-md font-medium">{listing.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}

          <div className="flex-shrink-0 w-[calc((100vw-80rem)/2)] hidden lg:block" />
        </motion.div>
      </div>

      {/* Keyboard hint + nav buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between">
        <div className="sm:hidden">
          <Link to="/listings" className="inline-flex items-center gap-1 text-navy font-medium hover:text-gold transition-colors">
            View all listings &rarr;
          </Link>
        </div>
        <div className="hidden sm:flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={() => scrollBy('left')}
            aria-label="Previous listings"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy('right')}
            aria-label="Next listings"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 flex items-center gap-2 text-muted text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
        <span>Use arrow keys or buttons to navigate</span>
      </motion.div>
    </section>
  );
}
