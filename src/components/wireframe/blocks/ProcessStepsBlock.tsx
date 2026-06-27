export default function ProcessStepsBlock() {
  const steps = [140, 313, 487, 660];
  return (
    <svg viewBox="0 0 800 220" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="220" fill="#ffffff" />
      <rect x="260" y="20" width="280" height="16" rx="4" fill="#94a3b8" />
      {/* Connecting line */}
      <rect x="180" y="87" width="440" height="2" fill="#e2e8f0" />
      {steps.map((cx, i) => (
        <g key={i}>
          {/* Step circle */}
          <circle cx={cx} cy="88" r="32" fill={i === 0 ? '#334155' : '#f1f5f9'} stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Step number placeholder */}
          <rect x={cx - 8} y="82" width="16" height="12" rx="3" fill={i === 0 ? '#ffffff' : '#94a3b8'} />
          {/* Icon placeholder */}
          <rect x={cx - 12} y="60" width="24" height="18" rx="4" fill={i === 0 ? 'rgba(255,255,255,0.25)' : '#e2e8f0'} />
          {/* Label */}
          <rect x={cx - 60} y="136" width="120" height="10" rx="3" fill="#334155" />
          {/* Description */}
          <rect x={cx - 56} y="154" width="112" height="7" rx="2" fill="#e2e8f0" />
          <rect x={cx - 48} y="167" width="96" height="7" rx="2" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  );
}
