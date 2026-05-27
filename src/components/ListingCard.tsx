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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15h14M5 15v-3a2 2 0 012-2h10a2 2 0 012 2v3M5 15v2a2 2 0 002 2h10a2 2 0 002-2v-2M3 21h18" />
            </svg>
            {listing.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-ink-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a2 2 0 012 2v2h-4V4a2 2 0 012-2zM7 8h10v2a5 5 0 01-10 0V8zM5 20h14v2H5v-2z" />
            </svg>
            {listing.baths} baths
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-ink-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {listing.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
