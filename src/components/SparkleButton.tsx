import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import MagneticButton, { MagneticAnchor, MagneticLink } from './MagneticButton';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
  rotation: number;
  duration: number;
}

const SPARKLE_COLORS = ['#c9a227', '#e8d5a3', '#ffffff', '#ffd700'];

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function useSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [sparkleId, setSparkleId] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const spawnSparkle = useCallback(() => {
    if (shouldReduceMotion) return;
    const angle = randomRange(0, Math.PI * 2);
    const distance = randomRange(40, 90);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const newSparkle: Sparkle = {
      id: sparkleId,
      x,
      y,
      scale: randomRange(0.4, 1.0),
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      rotation: randomRange(0, 360),
      duration: randomRange(0.8, 1.4),
    };

    setSparkles((prev) => [...prev, newSparkle]);
    setSparkleId((prev) => prev + 1);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, newSparkle.duration * 1000);
  }, [sparkleId, shouldReduceMotion]);

  useEffect(() => {
    if (!isHovered || shouldReduceMotion) return;
    const interval = setInterval(() => {
      spawnSparkle();
      if (Math.random() > 0.5) setTimeout(spawnSparkle, 60);
    }, 100);
    return () => clearInterval(interval);
  }, [isHovered, spawnSparkle, shouldReduceMotion]);

  return { sparkles, setIsHovered, shouldReduceMotion };
}

function SparkleLayer({ sparkles }: { sparkles: Sparkle[] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0, x: '50%', y: '50%', rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, sparkle.scale, 0],
              x: `calc(50% + ${sparkle.x}px)`,
              y: `calc(50% + ${sparkle.y}px)`,
              rotate: sparkle.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: sparkle.duration, ease: 'easeOut' }}
            className="absolute top-0 left-0 w-3 h-3"
            style={{ marginLeft: '-6px', marginTop: '-6px' }}
          >
            <svg viewBox="0 0 24 24" fill={sparkle.color} className="w-full h-full drop-shadow-sm">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sparkle Button
interface SparkleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  magneticStrength?: number;
}

export default function SparkleButton({
  children,
  className = '',
  onClick,
  type = 'button',
  magneticStrength = 0.3,
}: SparkleButtonProps) {
  const { sparkles, setIsHovered } = useSparkles();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SparkleLayer sparkles={sparkles} />
      <MagneticButton type={type} onClick={onClick} strength={magneticStrength} className={className}>
        {children}
      </MagneticButton>
    </div>
  );
}

// Sparkle Link
interface SparkleLinkProps {
  children: ReactNode;
  className?: string;
  to: string;
  magneticStrength?: number;
}

export function SparkleLink({ children, className = '', to, magneticStrength = 0.3 }: SparkleLinkProps) {
  const { sparkles, setIsHovered } = useSparkles();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SparkleLayer sparkles={sparkles} />
      <MagneticLink to={to} strength={magneticStrength} className={className}>
        {children}
      </MagneticLink>
    </div>
  );
}

// Sparkle Anchor
interface SparkleAnchorProps {
  children: ReactNode;
  className?: string;
  href: string;
  magneticStrength?: number;
}

export function SparkleAnchor({ children, className = '', href, magneticStrength = 0.3 }: SparkleAnchorProps) {
  const { sparkles, setIsHovered } = useSparkles();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SparkleLayer sparkles={sparkles} />
      <MagneticAnchor href={href} strength={magneticStrength} className={className}>
        {children}
      </MagneticAnchor>
    </div>
  );
}
