export default function FeatureListBlock() {
  return (
    <svg viewBox="0 0 800 280" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="280" fill="#ffffff" />
      {/* Section heading */}
      <rect x="40" y="28" width="200" height="18" rx="4" fill="#94a3b8" />
      <rect x="40" y="54" width="360" height="10" rx="3" fill="#e2e8f0" />
      {/* Feature rows */}
      {[92, 140, 188, 236].map((y, i) => (
        <g key={i}>
          {/* Icon box */}
          <rect x="40" y={y} width="36" height="36" rx="8" fill="#f1f5f9" />
          <rect x="52" y={y + 10} width="12" height="16" rx="2" fill="#cbd5e1" />
          {/* Text */}
          <rect x="92" y={y + 4} width="140" height="12" rx="3" fill="#64748b" />
          <rect x="92" y={y + 22} width="260" height="9" rx="3" fill="#e2e8f0" />
          {/* Right column */}
          <rect x="420" y={y} width="36" height="36" rx="8" fill="#f1f5f9" />
          <rect x="432" y={y + 10} width="12" height="16" rx="2" fill="#cbd5e1" />
          <rect x="472" y={y + 4} width="140" height="12" rx="3" fill="#64748b" />
          <rect x="472" y={y + 22} width="260" height="9" rx="3" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  );
}
