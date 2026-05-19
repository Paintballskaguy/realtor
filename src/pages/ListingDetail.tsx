import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { mockListings } from '../data/mockListings';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Motion';
import { SparkleAnchor } from '../components/SparkleButton';
import { formatPrice } from '../lib/utils';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-navy mb-4"
        >
          Listing Not Found
        </motion.h1>
        <Link to="/listings" className="text-gold font-medium hover:underline">
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
        <FadeIn>
          <Link to="/listings" className="inline-flex items-center gap-1 text-muted font-medium hover:text-gold transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to listings
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <FadeIn>
              <motion.div
                layoutId={`listing-image-${listing.id}`}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="w-full h-[20rem] sm:h-[28rem] object-cover"
                />
              </motion.div>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="lg:sticky lg:top-24">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gold text-sm font-semibold uppercase tracking-wider mb-2"
                >
                  {listing.city}, {listing.state}
                </motion.p>
                <motion.h1
                  layoutId={`listing-title-${listing.id}`}
                  className="text-3xl sm:text-4xl font-bold text-navy mb-2"
                >
                  {listing.address}
                </motion.h1>
                <motion.p
                  layoutId={`listing-price-${listing.id}`}
                  className="text-4xl font-extrabold text-gold mb-8"
                >
                  {formatPrice(listing.price)}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-4 mb-8"
                >
                  {[
                    { value: listing.beds, label: 'Beds' },
                    { value: listing.baths, label: 'Baths' },
                    { value: listing.sqft.toLocaleString(), label: 'Sq Ft' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400 } }}
                      className="rounded-xl bg-white border border-gray-100 p-5 text-center shadow-sm"
                    >
                      <div className="text-2xl font-bold text-navy">{stat.value}</div>
                      <div className="text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-6"
                >
                  <h3 className="font-bold text-navy mb-3">Description</h3>
                  <p className="text-muted leading-relaxed">{listing.description}</p>
                </motion.div>

                <SparkleAnchor
                  href="tel:9184088089"
                  className="w-full inline-flex justify-center items-center rounded-xl bg-navy px-6 py-4 font-bold text-white hover:bg-navy-light transition-colors shadow-lg shadow-navy/20"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call to Schedule a Tour
                </SparkleAnchor>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
