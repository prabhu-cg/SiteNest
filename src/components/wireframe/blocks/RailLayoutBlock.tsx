export default function RailLayoutBlock() {
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#f8fafc" />
      {/* Left rail */}
      <rect width="160" height="320" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Left rail header */}
      <rect x="16" y="20" width="128" height="10" rx="3" fill="#334155" />
      {/* Left rail nav items */}
      {[48, 70, 92, 114, 136, 158].map((y, i) => (
        <g key={i}>
          <rect x="12" y={y} width="136" height="16" rx="3" fill={i === 0 ? '#f1f5f9' : 'none'} />
          <rect x="20" y={y + 5} width={80 - i * 4} height="6" rx="2" fill={i === 0 ? '#334155' : '#94a3b8'} />
        </g>
      ))}
      {/* Left rail filter section */}
      <rect x="12" y="196" width="136" height="1" fill="#e2e8f0" />
      <rect x="16" y="208" width="80" height="8" rx="2" fill="#334155" />
      {[224, 240, 256, 272].map((y, i) => (
        <g key={i}>
          <rect x="16" y={y} width="8" height="8" rx="1" fill="#e2e8f0" />
          <rect x="30" y={y + 1} width={70 - i * 6} height="6" rx="2" fill="#cbd5e1" />
        </g>
      ))}

      {/* Main content area */}
      <rect x="168" y="16" width="464" height="20" rx="4" fill="#94a3b8" />
      <rect x="168" y="50" width="464" height="120" rx="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="184" y="66" width="200" height="10" rx="3" fill="#94a3b8" />
      <rect x="184" y="84" width="420" height="7" rx="2" fill="#e2e8f0" />
      <rect x="184" y="97" width="400" height="7" rx="2" fill="#e2e8f0" />
      <rect x="184" y="110" width="380" height="7" rx="2" fill="#e2e8f0" />
      <rect x="184" y="130" width="72" height="24" rx="4" fill="#334155" />

      <rect x="168" y="186" width="464" height="120" rx="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="184" y="202" width="180" height="10" rx="3" fill="#94a3b8" />
      <rect x="184" y="220" width="420" height="7" rx="2" fill="#e2e8f0" />
      <rect x="184" y="233" width="390" height="7" rx="2" fill="#e2e8f0" />
      <rect x="184" y="246" width="410" height="7" rx="2" fill="#e2e8f0" />
      <rect x="184" y="266" width="72" height="24" rx="4" fill="#334155" />

      {/* Right rail */}
      <rect x="640" width="160" height="320" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Right rail widget 1 */}
      <rect x="652" y="20" width="136" height="10" rx="3" fill="#334155" />
      <rect x="652" y="38" width="136" height="56" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="660" y="48" width="80" height="7" rx="2" fill="#94a3b8" />
      <rect x="660" y="61" width="100" height="7" rx="2" fill="#e2e8f0" />
      <rect x="660" y="74" width="60" height="7" rx="2" fill="#e2e8f0" />
      {/* Right rail widget 2 */}
      <rect x="652" y="110" width="136" height="10" rx="3" fill="#334155" />
      {[128, 146, 164, 182].map((y, i) => (
        <g key={i}>
          <rect x="652" y={y} width="6" height="6" rx="1" fill="#e2e8f0" />
          <rect x="664" y={y} width={60 - i * 4} height="6" rx="2" fill="#cbd5e1" />
        </g>
      ))}
      {/* Right rail widget 3 — ad/banner placeholder */}
      <rect x="652" y="210" width="136" height="88" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="688" y="244" width="64" height="8" rx="2" fill="#cbd5e1" />
      <rect x="696" y="258" width="48" height="6" rx="2" fill="#e2e8f0" />
    </svg>
  );
}
