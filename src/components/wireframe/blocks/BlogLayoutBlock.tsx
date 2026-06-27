export default function BlogLayoutBlock() {
  return (
    <svg viewBox="0 0 800 360" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="360" fill="#ffffff" />
      {/* Main article column */}
      {/* Featured image */}
      <rect x="32" y="24" width="492" height="160" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="200" y="84" width="156" height="40" rx="4" fill="#e2e8f0" />
      {/* Category tag */}
      <rect x="32" y="200" width="72" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="46" y="207" width="44" height="6" rx="2" fill="#94a3b8" />
      {/* Article title */}
      <rect x="32" y="228" width="420" height="16" rx="4" fill="#334155" />
      <rect x="32" y="252" width="340" height="16" rx="4" fill="#334155" />
      {/* Author + date row */}
      <circle cx="46" cy="284" r="10" fill="#e2e8f0" />
      <rect x="62" y="278" width="80" height="8" rx="2" fill="#94a3b8" />
      <rect x="62" y="290" width="60" height="6" rx="2" fill="#cbd5e1" />
      {/* Body text */}
      <rect x="32" y="308" width="480" height="7" rx="2" fill="#e2e8f0" />
      <rect x="32" y="321" width="460" height="7" rx="2" fill="#e2e8f0" />
      <rect x="32" y="334" width="400" height="7" rx="2" fill="#e2e8f0" />

      {/* Sidebar */}
      <rect x="556" y="24" width="212" height="1" fill="#e2e8f0" />
      {/* Author card */}
      <rect x="556" y="24" width="212" height="88" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="590" cy="58" r="18" fill="#e2e8f0" />
      <rect x="614" y="46" width="80" height="9" rx="2" fill="#334155" />
      <rect x="614" y="60" width="100" height="7" rx="2" fill="#94a3b8" />
      <rect x="614" y="74" width="60" height="7" rx="2" fill="#94a3b8" />
      {/* Categories */}
      <rect x="556" y="128" width="100" height="8" rx="2" fill="#334155" />
      {[148, 164, 180, 196].map((y, i) => (
        <g key={i}>
          <rect x="556" y={y} width="6" height="6" rx="1" fill="#cbd5e1" />
          <rect x="568" y={y} width={80 - i * 8} height="6" rx="2" fill="#e2e8f0" />
          <rect x="736" y={y} width="20" height="6" rx="2" fill="#f1f5f9" />
        </g>
      ))}
      {/* Recent posts */}
      <rect x="556" y="220" width="100" height="8" rx="2" fill="#334155" />
      {[240, 268, 296].map((y, i) => (
        <g key={i}>
          <rect x="556" y={y} width="48" height="36" rx="3" fill="#e2e8f0" />
          <rect x="612" y={y + 4} width={100 - i * 8} height="7" rx="2" fill="#94a3b8" />
          <rect x="612" y={y + 16} width="60" height="6" rx="2" fill="#cbd5e1" />
          <rect x="612" y={y + 26} width="40" height="6" rx="2" fill="#cbd5e1" />
        </g>
      ))}
    </svg>
  );
}
