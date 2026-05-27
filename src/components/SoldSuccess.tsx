import { motion } from 'framer-motion';

interface SoldProperty {
  address: string;
  city: string;
  state: string;
  image: string;
  listedPrice: number;
  soldPrice: number;
  daysOnMarket: number;
  note: string;
}

const soldProperties: SoldProperty[] = [
  {
    address: '1847 E 37th St',
    city: 'Tulsa',
    state: 'OK',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop',
    listedPrice: 385000,
    soldPrice: 412000,
    daysOnMarket: 4,
    note: 'Multiple offers within 48 hours',
  },
  {
    address: '5724 S Florence Ave',
    city: 'Tulsa',
    state: 'OK',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop',
    listedPrice: 520000,
    soldPrice: 545000,
    daysOnMarket: 6,
    note: 'Sold $25K over asking',
  },
  {
    address: '11028 S Riverside Dr',
    city: 'Tulsa',
    state: 'OK',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop',
    listedPrice: 750000,
    soldPrice: 775000,
    daysOnMarket: 9,
    note: 'Cash offer above appraisal',
  },
];

function formatPrice(n: number): string {
  return '$' + n.toLocaleString();
}

export default function SoldSuccess() {
  return (
    <section className="border-t border-rule bg-paper-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.15em] mb-4">
            Proven Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-4">
            Recently Sold — Above Asking
          </h2>
          <p className="text-ink-2 max-w-xl mx-auto leading-relaxed">
            Kandice does not just list homes. She markets them strategically to attract
            competitive offers and close above expectations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {soldProperties.map((property, i) => {
            const overAsking = property.soldPrice - property.listedPrice;
            const overPct = ((overAsking / property.listedPrice) * 100).toFixed(1);

            return (
              <motion.div
                key={property.address}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group rounded-[var(--radius-card)] border border-rule bg-paper overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.address}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-accent text-paper text-xs font-bold px-3 py-1.5 rounded-full">
                    Sold in {property.daysOnMarket} days
                  </div>
                  <div className="absolute top-3 right-3 bg-ink/80 text-paper text-xs font-semibold px-3 py-1.5 rounded-full">
                    +{overPct}%
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-ink mb-1">{property.address}</h3>
                  <p className="text-sm text-ink-2 mb-3">
                    {property.city}, {property.state}
                  </p>

                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-lg font-bold text-ink">
                      {formatPrice(property.soldPrice)}
                    </span>
                    <span className="text-sm text-ink-2 line-through">
                      {formatPrice(property.listedPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 text-accent font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {formatPrice(overAsking)} over asking
                    </span>
                  </div>

                  <p className="text-xs text-ink-2 mt-3 pt-3 border-t border-rule">
                    {property.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-ink-2 inline-flex items-center gap-2 bg-paper border border-rule rounded-full px-5 py-2.5">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Average sale price: <span className="font-semibold text-ink">6.2% above listing</span> · Average time on market: <span className="font-semibold text-ink">6 days</span>
          </p>
        </div>
      </div>
    </section>
  );
}
