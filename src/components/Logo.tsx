interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  height?: number;
}

export default function Logo({ className = '', variant = 'dark', height = 40 }: LogoProps) {
  const src = variant === 'dark' ? '/logo2.png' : '/logo1.png';

  return (
    <img
      src={src}
      alt="CENTURY 21 First Choice Realty"
      height={height}
      className={`w-auto object-contain ${className}`}
      style={{ height }}
    />
  );
}
