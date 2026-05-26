import { useParams, Link } from 'react-router';
import { mockListings } from '../data/mockListings';
import SEO from '../components/SEO';
import { SparkleAnchor } from '../components/SparkleButton';
import { formatPrice } from '../lib/utils';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink mb-4">Listing Not Found</h1>
        <Link to="/listings" className="text-ink font-medium hover:text-accent transition-colors">
          &larr; Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={`${listing.address} - ${listing.city}, ${listing.state}`}
        description={`${listing.beds} bed, ${listing.baths} bath, ${listing.sqft.toLocaleString()} sqft home for sale at ${listing.address}. ${listing.description}`}
        pathname={`/listings/${listing.id}`}
        image={listing.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/listings" className="inline-flex items-center gap-1 text-ink-2 font-medium hover:text-ink transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to listings
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="rounded-[var(--radius-card)] overflow-hidden border border-rule">
              <img
                src={listing.image}
                alt={listing.address}
                className="w-full h-[20rem] sm:h-[28rem] object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-medium text-ink-2 mb-2">
                {listing.city}, {listing.state}
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-2">
                {listing.address}
              </h1>
              <p className="text-4xl font-semibold text-ink tracking-[-0.02em] mb-8">
                {formatPrice(listing.price)}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: listing.beds, label: 'Beds' },
                  { value: listing.baths, label: 'Baths' },
                  { value: listing.sqft.toLocaleString(), label: 'Sq Ft' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--radius-card)] border border-rule p-5 text-center"
                  >
                    <div className="text-2xl font-semibold text-ink">{stat.value}</div>
                    <div className="text-xs text-ink-2 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-[var(--radius-card)] border border-rule p-6 mb-6">
                <h3 className="font-semibold text-ink mb-3">Description</h3>
                <p className="text-ink-2 leading-relaxed text-sm">{listing.description}</p>
              </div>

              <SparkleAnchor
                href="tel:9184088089"
                className="w-full inline-flex justify-center items-center rounded-full bg-ink px-6 py-4 font-semibold text-paper hover:bg-ink/90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call to Schedule a Tour
              </SparkleAnchor>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
