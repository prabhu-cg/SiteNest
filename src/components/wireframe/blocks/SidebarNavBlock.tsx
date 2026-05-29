export default function SidebarNavBlock() {
  return (
    <svg viewBox="0 0 800 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="300" fill="#f8fafc" />
      {/* Sidebar */}
      <rect width="200" height="300" fill="#ffffff" />
      <rect x="200" width="1" height="300" fill="#e2e8f0" />
      {/* Logo */}
      <rect x="20" y="20" width="28" height="20" rx="3" fill="#e2e8f0" />
      <rect x="56" y="24" width="80" height="12" rx="3" fill="#cbd5e1" />
      {/* Nav items */}
      {[80, 116, 152, 188, 224].map((y, i) => (
        <g key={i}>
          <rect x="16" y={y} width="168" height="28" rx="5" fill={i === 0 ? '#f1f5f9' : 'none'} />
          <rect x="28" y={y + 9} width="16" height="10" rx="2" fill={i === 0 ? '#334155' : '#cbd5e1'} />
          <rect x="52" y={y + 9} width="72" height="10" rx="3" fill={i === 0 ? '#334155' : '#94a3b8'} />
        </g>
      ))}
      {/* Main content area */}
      <rect x="228" y="28" width="200" height="18" rx="4" fill="#94a3b8" />
      <rect x="228" y="62" width="540" height="10" rx="3" fill="#e2e8f0" />
      <rect x="228" y="80" width="500" height="10" rx="3" fill="#e2e8f0" />
      <rect x="228" y="98" width="520" height="10" rx="3" fill="#e2e8f0" />
      <rect x="228" y="128" width="540" height="140" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="248" y="148" width="120" height="10" rx="3" fill="#cbd5e1" />
      <rect x="248" y="166" width="480" height="8" rx="3" fill="#e2e8f0" />
      <rect x="248" y="182" width="460" height="8" rx="3" fill="#e2e8f0" />
      <rect x="248" y="198" width="440" height="8" rx="3" fill="#e2e8f0" />
      <rect x="248" y="220" width="80" height="26" rx="4" fill="#334155" />
    </svg>
  );
}
