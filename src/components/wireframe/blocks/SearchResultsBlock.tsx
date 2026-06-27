export default function SearchResultsBlock() {
  return (
    <svg viewBox="0 0 800 360" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="360" fill="#f8fafc" />
      {/* Search bar */}
      <rect x="40" y="20" width="720" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="68" cy="40" r="10" fill="none" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="75" y1="47" x2="82" y2="54" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <rect x="92" y="34" width="200" height="12" rx="3" fill="#e2e8f0" />
      <rect x="700" y="28" width="48" height="24" rx="5" fill="#334155" />
      {/* Left filters */}
      <rect x="40" y="76" width="180" height="272" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="56" y="92" width="80" height="9" rx="2" fill="#334155" />
      {[112, 132, 152, 172, 192].map((y, i) => (
        <g key={i}>
          <rect x="56" y={y} width="10" height="10" rx="2" fill={i === 0 ? '#334155' : '#f1f5f9'} stroke="#e2e8f0" strokeWidth="1" />
          <rect x="74" y={y + 1} width={70 - i * 6} height="8" rx="2" fill="#94a3b8" />
          <rect x="168" y={y + 1} width="28" height="8" rx="2" fill="#f1f5f9" />
        </g>
      ))}
      <rect x="56" y="216" width="148" height="1" fill="#e2e8f0" />
      <rect x="56" y="228" width="80" height="9" rx="2" fill="#334155" />
      <rect x="56" y="248" width="148" height="6" rx="3" fill="#e2e8f0" />
      <rect x="56" y="248" width="88" height="6" rx="3" fill="#334155" />
      <circle cx="144" cy="251" r="7" fill="#334155" />
      <rect x="56" y="262" width="40" height="7" rx="2" fill="#94a3b8" />
      <rect x="148" y="262" width="40" height="7" rx="2" fill="#94a3b8" />
      {/* Results */}
      {[76, 172, 268].map((y, i) => (
        <g key={i}>
          <rect x="236" y={y} width="524" height="84" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="252" y={y + 14} width={220 - i * 16} height="11" rx="3" fill="#334155" />
          <rect x="252" y={y + 32} width="460" height="7" rx="2" fill="#e2e8f0" />
          <rect x="252" y={y + 45} width="400" height="7" rx="2" fill="#e2e8f0" />
          <rect x="252" y={y + 60} width="80" height="6" rx="2" fill="#cbd5e1" />
          <rect x="344" y={y + 60} width="60" height="6" rx="2" fill="#cbd5e1" />
          <rect x="680" y={y + 14} width="64" height="24" rx="5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
        </g>
      ))}
      <rect x="236" y="168" width="524" height="1" fill="none" />
    </svg>
  );
}
