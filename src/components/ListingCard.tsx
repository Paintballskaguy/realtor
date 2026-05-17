import { Link } from 'react-router';
import { motion } from 'framer-motion';
import type { Listing } from '../types/listing';
import TiltCard from './TiltCard';
import { formatPrice } from '../lib/utils';

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  return (
    <TiltCard className="group h-full">
      <Link
        to={`/listings/${listing.id}`}
        className="block h-full rounded-2xl border border-gray-100 bg-surface shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <motion.img
            layoutId={`listing-image-${listing.id}`}
            src={listing.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 bg-navy/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full"
          >
            {listing.featured ? 'Featured' : 'For Sale'}
          </motion.div>
        </div>
        <div className="p-5">
          <motion.h3
            layoutId={`listing-title-${listing.id}`}
            className="font-semibold text-navy group-hover:text-gold transition-colors truncate pr-2"
          >
            {listing.address}
          </motion.h3>
          <motion.p
            layoutId={`listing-price-${listing.id}`}
            className="text-lg font-bold text-gold mb-2"
          >
            {formatPrice(listing.price)}
          </motion.p>
          <p className="text-sm text-muted mb-4">
            {listing.city}, {listing.state} {listing.zip}
          </p>
          <div className="flex items-center gap-4 text-sm text-navy border-t border-gray-100 pt-4">
            <span className="flex items-center gap-1">
              <svg aria-hidden="true" className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
              {listing.beds} beds
            </span>
            <span className="flex items-center gap-1">
              <svg aria-hidden="true" className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              {listing.baths} baths
            </span>
            <span className="flex items-center gap-1">
              <svg aria-hidden="true" className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              {listing.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
