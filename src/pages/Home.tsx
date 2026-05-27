import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { mockListings } from '../data/mockListings';
import { agent } from '../data/agent';
import AgentCard from '../components/AgentCard';
import ListingCard from '../components/ListingCard';

import SEO from '../components/SEO';
import { SparkleLink } from '../components/SparkleButton';
import ListingAlertForm from '../components/ListingAlertForm';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import VirtualTourSection from '../components/VirtualTourSection';


function AnimatedCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [count, value]);

  return (
    <span>
      <motion.span>{formatted}</motion.span>
      {suffix}
    </span>
  );
}

export default function Home() {
  const featured = mockListings.filter((l) => l.featured);

  return (
    <div>
      <SEO
        title="Tulsa Real Estate Agent | Top-Rated Realtor"
        description={`${agent.name} is a top-rated Tulsa real estate agent with ${agent.office}. 4.8/5 stars from 50 clients. Free consultation. Browse homes for sale in Tulsa, OK.`}
        pathname="/"
      />

      {/* Hero — Light Trust-Focused */}
      <section className="relative bg-paper pt-28 pb-16 px-4 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="noise-hero">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-hero)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-paper-2 border border-rule rounded-full px-4 py-1.5 text-sm font-medium text-ink-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Accepting New Clients in Tulsa
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-ink tracking-[-0.03em] leading-[1.1] mb-6">
                Buy or Sell Your{' '}
                <span className="text-accent">Tulsa</span> Home With Confidence
              </h1>

              <p className="text-lg text-ink-2 max-w-lg mb-8 leading-relaxed">
                {agent.name} has earned {agent.reviewCount} five-star reviews by putting
                clients first. No pressure. No surprises. Just honest guidance and results.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <SparkleLink
                  to="/listings"
                  className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 font-semibold text-paper hover:bg-ink/90 transition-colors shadow-sm"
                >
                  See Homes for Sale
                </SparkleLink>
                <SparkleLink
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-ink/30 px-7 py-3.5 font-semibold text-ink hover:border-ink hover:bg-paper-2 transition-colors"
                >
                  Free Consultation
                </SparkleLink>
              </div>

              {/* Mini social proof */}
              <div className="flex items-center gap-4 text-sm text-ink-2">
                <div className="flex -space-x-2">
                  <img src={agent.photo} alt="" className="w-8 h-8 rounded-full border-2 border-paper object-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-paper bg-paper-2 flex items-center justify-center text-xs font-bold text-ink">
                    +{agent.reviewCount}
                  </div>
                </div>
                <span>
                  <span className="font-semibold text-ink">{agent.reviewCount} happy clients</span> in Tulsa
                </span>
              </div>
            </motion.div>

            {/* Right — hero image + floating stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden border border-rule shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop"
                  alt="Beautiful Tulsa home exterior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stat card — top right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-paper border border-rule rounded-[var(--radius-card)] shadow-lg p-4 hidden lg:block"
              >
                <div className="text-2xl font-bold text-ink">
                  <AnimatedCounter value={4.8} suffix="/5" decimals={1} />
                </div>
                <div className="text-xs text-ink-2">Average Rating</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: agent.reviewCount, label: '5-Star Reviews', suffix: '' },
              { value: 4.8, label: 'Average Rating', suffix: '/5', decimals: 1 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="text-xs text-ink-2 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">Tulsa Native</div>
              <div className="text-xs text-ink-2 uppercase tracking-wider mt-1">Local Expertise</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Agent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <AgentCard />
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-3">Featured Listings</h2>
          <p className="text-ink-2 max-w-xl">Hand-picked properties in the Tulsa metro area.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <SparkleLink
            to="/listings"
            className="inline-flex items-center gap-2 text-ink font-medium hover:text-accent transition-colors"
          >
            View all listings
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SparkleLink>
        </div>
      </section>

      {/* Virtual Tours */}
      <VirtualTourSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Why Work With Kandice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-3">Why Work With Kandice</h2>
          <p className="text-ink-2 max-w-xl">
            Buying or selling a home is one of the biggest decisions you will make. Kandice makes sure you never feel alone in it.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Local Expertise',
              desc: 'Born and raised in Tulsa. Kandice knows which neighborhoods are up-and-coming, which school districts rank highest, and where to find the hidden gems.',
            },
            {
              title: 'Proven Results',
              desc: 'Clients praise Kandice for her responsiveness, strong negotiation skills, and ability to close deals smoothly. She treats every transaction like it is her own.',
            },
            {
              title: 'No Pressure, Ever',
              desc: 'Kandice offers free consultations with zero obligation. She never rushes you into a decision, but she also never lets an opportunity slip away.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[var(--radius-card)] border border-rule p-8 hover:border-ink/20 transition-colors"
            >
              <h3 className="text-lg font-semibold text-ink mb-3">{card.title}</h3>
              <p className="text-ink-2 leading-relaxed text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-3">The Kandice Experience</h2>
            <p className="text-ink-2 max-w-xl">
              Every client gets the same energy, expertise, and dedication.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'Free, no-obligation meeting to discuss your goals, timeline, and budget. Kandice listens first, then builds a plan.' },
              { step: '02', title: 'Strategy & Search', desc: 'For buyers: curated listings that match your criteria. For sellers: a pricing and marketing strategy designed to maximize value.' },
              { step: '03', title: 'Close With Confidence', desc: 'Kandice handles the paperwork, negotiations, and unexpected hiccups so you can focus on your next chapter.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-sm font-mono text-accent mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-ink-2 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing Alerts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-3">See the Best Homes First</h2>
          <p className="text-ink-2 mb-8 leading-relaxed">
            The best Tulsa listings sell in days &mdash; sometimes hours. Get hand-picked properties sent straight to your inbox before they show up on Zillow or Redfin.
          </p>
          <ListingAlertForm />
          <p className="text-xs text-ink-2 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-rule">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-4">
            Ready to Make Your Move?
          </h2>
          <p className="text-ink-2 mb-8 max-w-xl mx-auto leading-relaxed">
            Buying or selling in Tulsa does not have to be overwhelming. Get honest advice, a clear plan, and an agent who answers her phone.
          </p>
          <SparkleLink
            to="/contact"
            className="inline-flex items-center rounded-full bg-ink px-8 py-4 font-semibold text-paper hover:bg-ink/90 transition-colors"
          >
            Schedule a Free Call
          </SparkleLink>
        </div>
      </section>
    </div>
  );
}
