export default function RightRailBlock() {
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#f8fafc" />
      {/* Main content area */}
      {/* Page title */}
      <rect x="24" y="20" width="240" height="18" rx="4" fill="#94a3b8" />
      {/* Featured card */}
      <rect x="24" y="52" width="560" height="140" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="24" y="52" width="200" height="140" rx="6" fill="#f1f5f9" />
      <rect x="80" y="108" width="88" height="28" rx="4" fill="#e2e8f0" />
      <rect x="240" y="72" width="200" height="12" rx="3" fill="#334155" />
      <rect x="240" y="92" width="320" height="7" rx="2" fill="#e2e8f0" />
      <rect x="240" y="105" width="300" height="7" rx="2" fill="#e2e8f0" />
      <rect x="240" y="118" width="280" height="7" rx="2" fill="#e2e8f0" />
      <rect x="240" y="155" width="88" height="26" rx="4" fill="#334155" />
      <rect x="334" y="155" width="88" height="26" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      {/* Post list */}
      {[208, 254, 300].map((y, i) => (
        <g key={i}>
          <rect x="24" y={y} width="560" height="38" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="36" y={y + 8} width={200 - i * 16} height="9" rx="2" fill="#94a3b8" />
          <rect x="36" y={y + 22} width={280 - i * 8} height="7" rx="2" fill="#e2e8f0" />
          <rect x="536" y={y + 11} width="36" height="16" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        </g>
      ))}
      {/* Right rail */}
      <rect x="600" width="200" height="320" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Search widget */}
      <rect x="612" y="20" width="176" height="10" rx="3" fill="#334155" />
      <rect x="612" y="36" width="176" height="28" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="624" y="46" width="100" height="8" rx="2" fill="#e2e8f0" />
      <rect x="760" y="40" width="20" height="20" rx="3" fill="#334155" />
      {/* Categories widget */}
      <rect x="612" y="80" width="120" height="9" rx="2" fill="#334155" />
      {[96, 112, 128, 144, 160].map((y, i) => (
        <g key={i}>
          <rect x="612" y={y} width="6" height="6" rx="1" fill="#e2e8f0" />
          <rect x="624" y={y} width={70 - i * 4} height="6" rx="2" fill="#cbd5e1" />
          <rect x="760" y={y} width="24" height="6" rx="3" fill="#f1f5f9" />
        </g>
      ))}
      {/* Tags widget */}
      <rect x="612" y="184" width="80" height="9" rx="2" fill="#334155" />
      <rect x="612" y="200" width="52" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="670" y="200" width="60" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="736" y="200" width="44" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="612" y="224" width="68" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="686" y="224" width="56" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      {/* Newsletter widget */}
      <rect x="612" y="260" width="176" height="48" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="622" y="270" width="100" height="8" rx="2" fill="#334155" />
      <rect x="622" y="284" width="120" height="7" rx="2" fill="#e2e8f0" />
      <rect x="622" y="296" width="152" height="4" rx="2" fill="#e2e8f0" />
    </svg>
  );
}
