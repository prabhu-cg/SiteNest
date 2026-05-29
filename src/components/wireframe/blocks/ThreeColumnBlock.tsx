export default function ThreeColumnBlock() {
  return (
    <svg viewBox="0 0 800 260" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="260" fill="#ffffff" />
      {[32, 288, 544].map((x, i) => (
        <g key={i}>
          {/* Icon */}
          <rect x={x} y="32" width="40" height="40" rx="10" fill="#f1f5f9" />
          <rect x={x + 12} y="44" width="16" height="16" rx="3" fill="#cbd5e1" />
          {/* Title */}
          <rect x={x} y="86" width="160" height="14" rx="3" fill="#64748b" />
          {/* Body */}
          <rect x={x} y="110" width="224" height="8" rx="3" fill="#e2e8f0" />
          <rect x={x} y="126" width="208" height="8" rx="3" fill="#e2e8f0" />
          <rect x={x} y="142" width="192" height="8" rx="3" fill="#e2e8f0" />
          <rect x={x} y="158" width="216" height="8" rx="3" fill="#e2e8f0" />
          {/* Link */}
          <rect x={x} y="180" width="80" height="8" rx="3" fill="#EE661D" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
