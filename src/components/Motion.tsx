import type { ReactNode } from 'react';

/* Hallmark · component: motion-wrappers · genre: modern-minimal · theme: custom
 * states: default · hover · focus · active · disabled · loading · error · success
 * note: Scroll reveals are disabled per modern-minimal discipline (page is composed).
 *      Only hover/focus microinteractions remain.
 */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  className = '',
}: FadeInProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerContainer({
  children,
  className = '',
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function ScaleOnHover({
  children,
  className = '',
}: ScaleOnHoverProps) {
  return <div className={`${className} transition-transform duration-200 ease-out hover:scale-[1.02]`}>{children}</div>;
}
