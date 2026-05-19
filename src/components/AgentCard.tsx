import { motion } from 'framer-motion';
import { agent } from '../data/agent';
import { FadeIn } from './Motion';
import { SparkleAnchor } from './SparkleButton';
import { normalizePhone } from '../lib/utils';

export default function AgentCard() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-gray-100 bg-surface p-8 shadow-lg flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative flex-shrink-0"
        >
          <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-xl ring-4 ring-gold/20">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </div>

        </motion.div>

        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl font-bold text-navy mb-1">{agent.name}</h3>
          <p className="text-sm text-gold font-semibold uppercase tracking-wider mb-4">{agent.title} &bull; {agent.office}</p>
          <p className="text-muted leading-relaxed mb-6 max-w-2xl">{agent.bio}</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <SparkleAnchor
              href={`tel:${normalizePhone(agent.phone)}`}
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-light transition-colors shadow-lg shadow-navy/20"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {agent.phone}
            </SparkleAnchor>
            {agent.email && (
              <SparkleAnchor
                href={`mailto:${agent.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 font-semibold text-navy hover:border-gold hover:text-gold transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email
              </SparkleAnchor>
            )}
            {agent.social.facebook && (
              <SparkleAnchor
                href={agent.social.facebook}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 font-semibold text-navy hover:border-gold hover:text-gold transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </SparkleAnchor>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
