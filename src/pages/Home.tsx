import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { mockListings } from '../data/mockListings';
import { agent } from '../data/agent';
import AgentCard from '../components/AgentCard';
import HeroParticles from '../components/HeroParticles';
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
        title="Tulsa Real Estate Agent"
        description={`${agent.name} is a top-rated Tulsa real estate agent with ${agent.office}. Browse homes for sale in Tulsa, OK.`}
        pathname="/"
      />

      {/* Hero */}
      <section className="relative animated-gradient text-white py-24 px-4 overflow-hidden noise-overlay">
        <HeroParticles />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {agent.office}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Find Your <span className="gradient-gold">Tulsa</span> Home
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Browse top listings across Northeast Oklahoma, connect with {agent.name}, and move into the perfect place.
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
              Browse Listings
            </SparkleLink>
            <SparkleLink
              to="/contact"
              className="inline-flex items-center rounded-xl bg-white/10 backdrop-blur px-8 py-4 font-bold text-white hover:bg-white/20 transition-colors border border-white/10"
            >
              Work With {agent.name.split(' ')[0]}
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

      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to <span className="gradient-gold">Find Home</span>?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Whether you are buying your first home or selling a property in Tulsa, {agent.name} is here to guide you every step of the way.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <SparkleLink
                to="/contact"
                className="inline-flex items-center rounded-xl bg-gold px-8 py-4 font-bold text-navy hover:bg-gold-hover transition-colors"
              >
                Schedule a Consultation
              </SparkleLink>
              <SparkleAnchor
                href={`tel:${normalizePhone(agent.phone)}`}
                className="inline-flex items-center rounded-xl bg-white/10 px-8 py-4 font-bold text-white hover:bg-white/20 transition-colors border border-white/10"
              >
                Call {agent.phone}
              </SparkleAnchor>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
