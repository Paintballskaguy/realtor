import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { mockListings } from '../data/mockListings';
import { agent } from '../data/agent';
import AgentCard from '../components/AgentCard';
import ParticleCanvas from '../components/ParticleCanvas';

import InertiaGrid from '../components/InertiaGrid';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Motion';
import { SparkleLink, SparkleAnchor } from '../components/SparkleButton';
import { normalizePhone } from '../lib/utils';

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
        title="Tulsa Real Estate Agent | 5-Star Reviews"
        description={`${agent.name} is a 5-star Tulsa real estate agent with ${agent.office}. Free consultation. Browse homes for sale in Tulsa, OK.`}
        pathname="/"
      />

      {/* Hero */}
      <section className="relative animated-gradient text-white py-24 px-4 overflow-hidden noise-overlay">
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
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto mt-16"
        >
          <div className="glass rounded-2xl px-8 py-6 flex flex-wrap justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={34} /></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">5-Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={5} suffix="/5" /></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={6} /></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-gold"><AnimatedCounter value={10} suffix="+" /></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AgentCard />
      </section>

      <InertiaGrid listings={featured} title="Featured Listings" subtitle="Properties" />

      {/* Why Kandice */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">Why Work With Kandice</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Real Estate That Puts You First</h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Buying or selling a home is one of the biggest decisions you will make. Kandice makes sure you never feel alone in it.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Local Expertise',
                desc: 'Born and raised in Tulsa. Kandice knows which neighborhoods are up-and-coming, which school districts rank highest, and where to find the hidden gems.',
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
              },
              {
                title: 'Proven Results',
                desc: `${agent.reviewCount} five-star reviews do not happen by accident. Clients praise Kandice's responsiveness, negotiation skills, and ability to close deals smoothly.`,
                icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
              },
              {
                title: 'No Pressure, Ever',
                desc: 'Kandice offers free consultations with zero obligation. She will tell you if now is not the right time to sell, and she will never rush you into a decision.',
                icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Client Love */}
      <section className="bg-navy text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Tulsa Homeowners</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
              {agent.name} has earned {agent.reviewCount} five-star reviews from buyers and sellers across Northeast Oklahoma. Here is what a few of them had to say.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                { quote: 'Kandice made buying our first home so easy. She was available every time we had a question and negotiated a great price for us.', name: 'Sarah M.', location: 'Tulsa, OK' },
                { quote: 'We interviewed three agents before choosing Kandice. She sold our home in under two weeks for above asking price. Highly recommend!', name: 'David & Lisa K.', location: 'Broken Arrow, OK' },
                { quote: 'As a single mom relocating to Tulsa, I needed someone patient who understood my budget. Kandice found the perfect home in Brookside.', name: 'Jennifer T.', location: 'Tulsa, OK' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="text-sm">
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-gray-400">{t.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
              <SparkleAnchor
                href={agent.social.facebook || '#'}
                className="inline-flex items-center rounded-xl bg-gold px-8 py-4 font-bold text-navy hover:bg-gold-hover transition-colors shadow-lg shadow-gold/20"
              >
                Read More Reviews on Facebook
              </SparkleAnchor>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Listing Alerts */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">Stay Ahead of the Market</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Get New Listing Alerts</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The best homes in Tulsa move fast. Enter your email and Kandice will send you new listings that match your criteria before they hit the mainstream sites.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => { e.preventDefault(); /* TODO: Wire to email service */ }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-navy font-medium focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="rounded-xl bg-navy px-6 py-3 font-bold text-white hover:bg-navy-light transition-colors shadow-lg shadow-navy/20"
              >
                Get Alerts
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
          </FadeIn>
        </div>
      </section>

      <section className="relative bg-navy text-white py-32 px-4 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 shadow-navy/20">
              Ready to Make Your <span className="gradient-gold">Move</span>?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Buying or selling in Tulsa does not have to be overwhelming. Get honest advice, a clear plan, and an agent who answers her phone.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <SparkleLink
                to="/contact"
                className="inline-flex items-center rounded-xl bg-gold px-8 py-4 font-bold text-navy hover:bg-gold-hover transition-colors shadow-lg shadow-gold/20"
              >
                Schedule a Free Call
              </SparkleLink>
              <SparkleAnchor
                href={`tel:${normalizePhone(agent.phone)}`}
                className="inline-flex items-center rounded-xl bg-white/10 backdrop-blur-sm px-8 py-4 font-bold text-white hover:bg-white/20 transition-colors border border-white/10"
              >
                Call or Text {agent.phone}
              </SparkleAnchor>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
