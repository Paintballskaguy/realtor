import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useMotionTemplate } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 10,
  glowColor = 'rgba(242, 169, 0, 0.15)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Unified position state [0, 1]
  const xPercent = useMotionValue(0.5);
  const yPercent = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 30 };
  const xSpring = useSpring(xPercent, springConfig);
  const ySpring = useSpring(yPercent, springConfig);

  // Rotation transforms
  const rotateX = useTransform(ySpring, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltAmount, tiltAmount]);

  // Sheen / Glow transforms using useMotionTemplate for performance and to avoid hook violations
  const sheenX = useTransform(xSpring, [0, 1], ['-50%', '150%']);
  const sheenY = useTransform(ySpring, [0, 1], ['-50%', '150%']);

  const glowX = useTransform(xSpring, [0, 1], ['0%', '100%']);
  const glowY = useTransform(ySpring, [0, 1], ['0%', '100%']);
  const glowGradient = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, ${glowColor}, transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    xPercent.set(xPos);
    yPercent.set(yPos);
  };

  const handleMouseLeave = () => {
    xPercent.set(0.5);
    yPercent.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative group ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: glowGradient }}
        />
      )}
      <div className="relative overflow-hidden rounded-2xl">
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)`,
              x: sheenX,
              y: sheenY,
            }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
}
