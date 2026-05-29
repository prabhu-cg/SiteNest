export default function CardGrid2Block() {
  return (
    <svg viewBox="0 0 800 280" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="280" fill="#f8fafc" />
      {/* Section heading */}
      <rect x="280" y="24" width="240" height="18" rx="4" fill="#94a3b8" />
      <rect x="320" y="50" width="160" height="10" rx="3" fill="#cbd5e1" />
      {/* Two cards */}
      {[40, 428].map((x, i) => (
        <g key={i}>
          <rect x={x} y="80" width="332" height="180" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          {/* Image */}
          <rect x={x + 12} y="92" width="308" height="80" rx="5" fill="#e2e8f0" />
          <line x1={x + 12} y1="92" x2={x + 320} y2="172" stroke="#cbd5e1" strokeWidth="1" />
          <line x1={x + 320} y1="92" x2={x + 12} y2="172" stroke="#cbd5e1" strokeWidth="1" />
          {/* Text */}
          <rect x={x + 16} y="184" width="160" height="12" rx="3" fill="#94a3b8" />
          <rect x={x + 16} y="204" width="280" height="8" rx="3" fill="#e2e8f0" />
          <rect x={x + 16} y="220" width="240" height="8" rx="3" fill="#e2e8f0" />
          <rect x={x + 16} y="240" width="72" height="8" rx="3" fill="#EE661D" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
