import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

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
  glowColor = 'rgba(201, 162, 39, 0.15)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 30 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltAmount, tiltAmount]);

  const sheenX = useTransform(xSpring, [0, 1], ['-50%', '150%']);
  const sheenY = useTransform(ySpring, [0, 1], ['-50%', '150%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
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
      className={`relative ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${useTransform(xSpring, [0, 1], ['0%', '100%'])} ${useTransform(ySpring, [0, 1], ['0%', '100%'])}, ${glowColor}, transparent 40%)`,
          }}
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
