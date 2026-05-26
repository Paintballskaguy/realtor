import { agent } from '../data/agent';
import { SparkleAnchor } from './SparkleButton';
import { normalizePhone } from '../lib/utils';

export default function AgentCard() {
  return (
    <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
      <div className="relative flex-shrink-0">
        <div className="w-56 h-56 rounded-[var(--radius-card)] overflow-hidden shadow-sm">
          <img
            src={agent.photo}
            alt={agent.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-ink mb-1">{agent.name}</h3>
        <p className="text-sm text-ink-2 font-medium mb-4">
          {agent.title} · {agent.office}
        </p>
        <p className="text-ink-2 leading-relaxed mb-6 max-w-2xl">{agent.bio}</p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          <SparkleAnchor
            href={`tel:${normalizePhone(agent.phone)}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-ink/90 transition-colors"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {agent.phone}
          </SparkleAnchor>
          {agent.email && (
            <SparkleAnchor
              href={`mailto:${agent.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-rule px-6 py-3 font-semibold text-ink hover:border-ink transition-colors"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </SparkleAnchor>
          )}
        </div>
      </div>
    </div>
  );
}
