import { mockListings } from '../data/mockListings';
import ListingCard from '../components/ListingCard';
import ParticleCanvas from '../components/ParticleCanvas';
import SEO from '../components/SEO';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Motion';

export default function Listings() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Homes for Sale in Tulsa, OK"
        description="Browse homes for sale in Tulsa, Oklahoma. View photos, prices, and details. Contact Kandice Nowak for a private showing."
        pathname="/listings"
      />

      {/* Page Header */}
      <div className="relative bg-navy text-white py-16 px-4 overflow-hidden">
        <ParticleCanvas mode="hero" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Tulsa, Oklahoma</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">All Listings</h1>
            <p className="text-gray-400 max-w-xl">
              Browse {mockListings.length} properties currently on the market in the Tulsa metro area.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockListings.map((listing) => (
            <StaggerItem key={listing.id}>
              <ListingCard listing={listing} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
