import { agent } from '../data/agent';

export default function TrustBar() {
  return (
    <section className="border-t border-rule bg-paper-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5" aria-label="4.8 out of 5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i <= 4 ? 'text-gold' : 'text-gold/40'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-ink">{agent.rating}</span>
            </div>
            <span className="text-rule hidden sm:inline">|</span>
            <span className="text-ink-2">
              <span className="font-semibold text-ink">{agent.reviewCount}+</span> verified client reviews
            </span>
            <span className="text-rule hidden sm:inline">|</span>
            <span className="text-ink-2 hidden sm:inline">Tulsa native · 6+ years experience</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-ink-2 hidden md:inline">Verified by RealSatisfied</span>
            <a
              href={agent.social.zillow}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink font-medium hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              View on Zillow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
