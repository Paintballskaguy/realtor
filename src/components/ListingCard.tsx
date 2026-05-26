import { Link } from 'react-router';
import type { Listing } from '../types/listing';
import { formatPrice } from '../lib/utils';

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group block h-full rounded-[var(--radius-card)] border border-rule bg-paper overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={listing.image}
          alt={listing.address}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-ink/80 text-paper text-xs font-semibold px-3 py-1.5 rounded-full">
          {listing.featured ? 'Featured' : 'For Sale'}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-ink group-hover:text-accent transition-colors truncate pr-2">
          {listing.address}
        </h3>
        <p className="text-lg font-bold text-ink mb-1">
          {formatPrice(listing.price)}
        </p>
        <p className="text-sm text-ink-2 mb-4">
          {listing.city}, {listing.state} {listing.zip}
        </p>
        <div className="flex items-center gap-4 text-sm text-ink border-t border-rule pt-4">
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-ink-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {listing.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-ink-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {listing.baths} baths
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-ink-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {listing.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
