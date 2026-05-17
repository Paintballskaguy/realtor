import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  twinkleSpeed?: number;
  twinkleOffset?: number;
}

interface ParticleCanvasProps {
  mode?: 'hero' | 'field';
  className?: string;
  count?: number;
}

export default function ParticleCanvas({ 
  mode = 'hero', 
  className = '',
  count: manualCount
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (mode === 'hero' && parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      const defaultCount = mode === 'hero' 
        ? Math.min(Math.floor((canvas.width * canvas.height) / 8000), 180)
        : Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      
      const count = manualCount || defaultCount;

      particlesRef.current = Array.from({ length: count }, () => {
        const p: Particle = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (mode === 'hero' ? 0.4 : 0.3),
          vy: (Math.random() - 0.5) * (mode === 'hero' ? 0.4 : 0.3) - (mode === 'hero' ? 0.15 : 0.1),
          size: mode === 'hero' ? Math.random() * 1.8 + 0.4 : Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
          targetAlpha: Math.random() * 0.6 + 0.2,
        };

        if (mode === 'hero') {
          p.twinkleSpeed = Math.random() * 0.02 + 0.005;
          p.twinkleOffset = Math.random() * Math.PI * 2;
        }

        return p;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = mode === 'hero' ? 200 : 150;
        
        if (dist < interactionRadius && dist > 0) {
          const force = (interactionRadius - dist) / interactionRadius;
          const strength = mode === 'hero' ? 0.08 : -0.5; // hero attracts/swirls, field repels slightly
          p.vx += (dx / dist) * force * strength;
          p.vy += (dy / dist) * force * strength;
        }

        // Friction and drift
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Alpha / Twinkle
        let currentAlpha: number;
        if (mode === 'hero' && p.twinkleSpeed !== undefined) {
          const twinkle = Math.sin(time * p.twinkleSpeed + (p.twinkleOffset || 0)) * 0.5 + 0.5;
          currentAlpha = p.alpha * (0.4 + twinkle * 0.6);
        } else {
          p.alpha += (p.targetAlpha - p.alpha) * 0.02;
          if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
            p.targetAlpha = Math.random() * 0.6 + 0.1;
          }
          currentAlpha = p.alpha;
        }

        // Draw
        ctx.beginPath();
        if (mode === 'hero') {
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(242, 169, 0, ${currentAlpha * 0.08})`;
            ctx.fill();
            ctx.beginPath();
        }
        
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = mode === 'hero' ? `rgba(255, 230, 170, ${currentAlpha})` : `rgba(242, 169, 0, ${currentAlpha})`;
        ctx.fill();

        // Extra details for field mode
        if (mode === 'field' && p.size > 1.5) {
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2, p.y);
          ctx.lineTo(p.x + p.size * 2, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2);
          ctx.lineTo(p.x, p.y + p.size * 2);
          ctx.strokeStyle = `rgba(242, 169, 0, ${currentAlpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = mode === 'hero' ? 140 : 120;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (mode === 'hero' ? 0.2 : 0.15);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(242, 169, 0, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    const target = mode === 'hero' ? canvas : window;
    target.addEventListener('mousemove', handleMouseMove as EventListener);
    target.addEventListener('mouseleave', handleMouseLeave as EventListener);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      target.removeEventListener('mousemove', handleMouseMove as EventListener);
      target.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [mode, manualCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`${mode === 'hero' ? 'absolute' : 'fixed'} inset-0 ${mode === 'hero' ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
      style={{ zIndex: mode === 'hero' ? 1 : 0 }}
    />
  );
}
