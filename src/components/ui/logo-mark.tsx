interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 20, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="100" height="100" rx="20" fill="#EE661D" />

      {/* Root node */}
      <rect x="28" y="10" width="44" height="24" rx="5" fill="white" />

      {/* Vertical connector from root */}
      <rect x="44" y="34" width="12" height="14" fill="rgba(255,255,255,0.6)" />

      {/* Horizontal bar */}
      <rect x="18" y="48" width="64" height="10" fill="rgba(255,255,255,0.6)" />

      {/* Left stem */}
      <rect x="18" y="58" width="12" height="10" fill="rgba(255,255,255,0.6)" />

      {/* Right stem */}
      <rect x="70" y="58" width="12" height="10" fill="rgba(255,255,255,0.6)" />

      {/* Left child node */}
      <rect x="6" y="68" width="36" height="22" rx="5" fill="rgba(255,255,255,0.92)" />

      {/* Right child node */}
      <rect x="58" y="68" width="36" height="22" rx="5" fill="rgba(255,255,255,0.92)" />
    </svg>
  );
}
