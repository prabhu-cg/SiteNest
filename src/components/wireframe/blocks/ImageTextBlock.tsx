export default function ImageTextBlock() {
  return (
    <svg viewBox="0 0 800 260" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="260" fill="#ffffff" />
      {/* Left image */}
      <rect x="40" y="32" width="320" height="200" rx="10" fill="#e2e8f0" />
      <line x1="40" y1="32" x2="360" y2="232" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="360" y1="32" x2="40" y2="232" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="172" y="120" width="48" height="36" rx="4" fill="#cbd5e1" />
      <circle cx="182" cy="130" r="5" fill="#94a3b8" />
      {/* Right text */}
      <rect x="400" y="44" width="100" height="16" rx="8" fill="#e2e8f0" />
      <rect x="400" y="72" width="340" height="18" rx="4" fill="#94a3b8" />
      <rect x="400" y="98" width="300" height="18" rx="4" fill="#94a3b8" />
      <rect x="400" y="130" width="360" height="9" rx="3" fill="#e2e8f0" />
      <rect x="400" y="147" width="340" height="9" rx="3" fill="#e2e8f0" />
      <rect x="400" y="164" width="320" height="9" rx="3" fill="#e2e8f0" />
      <rect x="400" y="193" width="120" height="32" rx="6" fill="#334155" />
      <rect x="532" y="193" width="120" height="32" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
    </svg>
  );
}
