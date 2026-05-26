import { mockListings } from '../data/mockListings';
import ListingCard from '../components/ListingCard';
import SEO from '../components/SEO';

export default function Listings() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Homes for Sale in Tulsa, OK"
        description="Browse homes for sale in Tulsa, Oklahoma. View photos, prices, and details. Contact Kandice Nowak for a private showing."
        pathname="/listings"
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.02em] mb-3">Homes for Sale in Tulsa, OK</h1>
        <p className="text-ink-2 max-w-xl">
          Browse current properties in the Tulsa metro area. Want first pick? Kandice can send you new listings the day they hit the market.
        </p>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
