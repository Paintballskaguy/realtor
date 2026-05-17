import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Magnetic strength={strength}>
      <motion.button
        type={type}
        onClick={onClick}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={className}
      >
        {children}
      </motion.button>
    </Magnetic>
  );
}

interface MagneticLinkProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  to: string;
}

export function MagneticLink({
  children,
  className = '',
  strength = 0.3,
  to,
}: MagneticLinkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Magnetic strength={strength}>
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Link to={to} className={className}>
          {children}
        </Link>
      </motion.div>
    </Magnetic>
  );
}

interface MagneticAnchorProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href: string;
}

export function MagneticAnchor({
  children,
  className = '',
  strength = 0.3,
  href,
}: MagneticAnchorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Magnetic strength={strength}>
      <motion.a
        href={href}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={className}
      >
        {children}
      </motion.a>
    </Magnetic>
  );
}
