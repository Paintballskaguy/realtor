import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { mockListings } from '../data/mockListings';
import { agent } from '../data/agent';
import AgentCard from '../components/AgentCard';
import ListingCard from '../components/ListingCard';
import ParticleCanvas from '../components/ParticleCanvas';
import SEO from '../components/SEO';
import { SparkleLink } from '../components/SparkleButton';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [count, value]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
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

      {/* Hero */}
      <section className="relative animated-gradient text-white pt-32 pb-24 px-4 overflow-hidden noise-overlay">
        <ParticleCanvas mode="hero" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {agent.office} &bull; Free Consultation
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Buy or Sell Your <span className="gradient-gold">Tulsa</span> Home
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {agent.name} has earned {agent.reviewCount} five-star reviews by putting clients first. No pressure. No surprises. Just honest guidance and results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <SparkleLink
              to="/listings"
              className="inline-flex items-center rounded-xl bg-gold px-8 py-4 font-bold text-navy hover:bg-gold-hover transition-colors shadow-lg shadow-gold/20"
            >
              See Homes for Sale
            </SparkleLink>
            <SparkleLink
              to="/contact"
              className="inline-flex items-center rounded-xl bg-white/10 backdrop-blur px-8 py-4 font-bold text-white hover:bg-white/20 transition-colors border border-white/10"
            >
              Get a Free Consultation
            </SparkleLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto mt-16"
          >
            <div className="glass rounded-2xl px-8 py-6 flex flex-wrap justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={agent.reviewCount} /></div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">5-Star Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-gold">
                  <AnimatedCounter value={4} />.<AnimatedCounter value={8} />/5
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={6} /></div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={99} suffix="%" /></div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Would Recommend</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Testimonials */}
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl sm:text-3xl font-medium text-ink tracking-[-0.02em] leading-snug mb-8">
              &ldquo;Kandice made the entire process feel effortless. She was always available, never pushy, and got us $15K above asking.&rdquo;
            </blockquote>
            <div className="text-ink-2 text-sm">
              <span className="font-medium text-ink">The Henderson Family</span> &middot; Tulsa, OK
            </div>
          </div>
        </div>
      </section>

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
          <form
            className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 w-full max-w-xl mx-auto"
            onSubmit={(e) => { e.preventDefault(); /* TODO: Wire to email service */ }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="w-full rounded-full border border-ink/30 px-6 py-4 text-base text-ink font-medium focus:outline-none focus:border-ink transition-colors bg-white shadow-sm"
            />
            <button
              type="submit"
              className="w-full rounded-full border border-transparent bg-ink px-8 py-4 text-base font-semibold text-paper hover:bg-ink/90 transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
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
