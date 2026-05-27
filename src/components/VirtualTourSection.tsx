import { motion } from 'framer-motion';

const features = [
  {
    title: '3D Walkthroughs',
    desc: 'Matterport-powered tours let buyers explore every room from their phone before scheduling a showing.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Drone Videography',
    desc: 'Cinematic aerial footage showcases the neighborhood, lot size, and nearby amenities from above.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22V12" />
      </svg>
    ),
  },
  {
    title: 'Twilight Photography',
    desc: 'Professional dusk shots create emotional impact and help listings stand out in search results.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
];

export default function VirtualTourSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <div>
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.15em] mb-4">
            Marketing That Moves
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-[-0.02em] mb-4">
            Every Listing Gets the Hollywood Treatment
          </h2>
          <p className="text-ink-2 leading-relaxed mb-8 max-w-lg">
            In today is market, photos are not enough. Buyers expect immersive experiences
            before they ever step foot in a home. Kandice delivers professional video,
            3D tours, and drone footage on every listing — at no extra cost to sellers.
          </p>

          <div className="space-y-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-paper-2 border border-rule flex items-center justify-center text-accent">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-0.5">{f.title}</h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden border border-rule shadow-lg relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
              alt="Luxury home interior with natural light"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-ink hover:scale-110 transition-transform cursor-pointer">
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute bottom-4 left-4 bg-ink/80 backdrop-blur text-paper text-xs font-semibold px-3 py-1.5 rounded-full">
              Sample Walkthrough
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
