interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
}

export default function Logo({ className = '', showText = true, size = 40 }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Roof */}
        <path
          d="M4 20L24 4L44 20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        />
        {/* Chimney */}
        <path
          d="M34 12V6H40V16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        />
        {/* House body */}
        <path
          d="M8 20V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        />
        {/* Door */}
        <path
          d="M20 44V32C20 30.8954 20.8954 30 22 30H26C27.1046 30 28 30.8954 28 32V44"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        />
        {/* Window left */}
        <rect
          x="13"
          y="24"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gold"
        />
        {/* Window right */}
        <rect
          x="29"
          y="24"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gold"
        />
      </svg>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-bold text-navy tracking-tight text-lg">Kandice Nowak</span>
          <span className="text-[10px] text-gold font-semibold uppercase tracking-[0.15em]">Realty</span>
        </div>
      )}
    </div>
  );
}
