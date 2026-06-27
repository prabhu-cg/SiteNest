export default function LeftRailBlock() {
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#f8fafc" />
      {/* Left rail */}
      <rect width="180" height="320" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Rail header / logo */}
      <rect x="16" y="20" width="28" height="20" rx="3" fill="#e2e8f0" />
      <rect x="52" y="25" width="80" height="10" rx="3" fill="#cbd5e1" />
      {/* Nav items */}
      {[60, 88, 116, 144, 172, 200].map((y, i) => (
        <g key={i}>
          <rect x="12" y={y} width="156" height="22" rx="4" fill={i === 0 ? '#f1f5f9' : 'none'} />
          <rect x="22" y={y + 7} width="14" height="8" rx="2" fill={i === 0 ? '#334155' : '#e2e8f0'} />
          <rect x="42" y={y + 7} width={70 - i * 4} height="8" rx="2" fill={i === 0 ? '#334155' : '#94a3b8'} />
        </g>
      ))}
      {/* Divider */}
      <rect x="12" y="240" width="156" height="1" fill="#e2e8f0" />
      {/* Bottom section label */}
      <rect x="16" y="252" width="60" height="7" rx="2" fill="#cbd5e1" />
      {[268, 284, 300].map((y) => (
        <rect key={y} x="16" y={y} width={80 + Math.random() * 40 | 0} height="6" rx="2" fill="#e2e8f0" />
      ))}
      {/* Main content area */}
      {/* Page title */}
      <rect x="204" y="20" width="240" height="18" rx="4" fill="#94a3b8" />
      {/* Toolbar row */}
      <rect x="204" y="52" width="560" height="32" rx="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="216" y="62" width="120" height="10" rx="3" fill="#e2e8f0" />
      <rect x="684" y="60" width="68" height="14" rx="3" fill="#334155" />
      {/* Content cards */}
      {[100, 192, 284].map((y, i) => (
        <g key={i}>
          <rect x="204" y={y} width="560" height="80" rx="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="220" y={y + 16} width={160 - i * 12} height="10" rx="3" fill="#94a3b8" />
          <rect x="220" y={y + 34} width="480" height="7" rx="2" fill="#e2e8f0" />
          <rect x="220" y={y + 47} width="440" height="7" rx="2" fill="#e2e8f0" />
          <rect x="220" y={y + 58} width="72" height="14" rx="3" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
