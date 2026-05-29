export default function TwoColumnBlock() {
  return (
    <svg viewBox="0 0 800 260" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="260" fill="#ffffff" />
      {/* Left column */}
      <rect x="40" y="28" width="200" height="16" rx="4" fill="#94a3b8" />
      <rect x="40" y="56" width="340" height="9" rx="3" fill="#e2e8f0" />
      <rect x="40" y="73" width="320" height="9" rx="3" fill="#e2e8f0" />
      <rect x="40" y="90" width="340" height="9" rx="3" fill="#e2e8f0" />
      <rect x="40" y="107" width="300" height="9" rx="3" fill="#e2e8f0" />
      <rect x="40" y="128" width="340" height="9" rx="3" fill="#e2e8f0" />
      <rect x="40" y="145" width="280" height="9" rx="3" fill="#e2e8f0" />
      <rect x="40" y="172" width="100" height="32" rx="6" fill="#334155" />
      {/* Divider */}
      <line x1="420" y1="28" x2="420" y2="232" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
      {/* Right column */}
      <rect x="440" y="28" width="200" height="16" rx="4" fill="#94a3b8" />
      <rect x="440" y="56" width="320" height="9" rx="3" fill="#e2e8f0" />
      <rect x="440" y="73" width="300" height="9" rx="3" fill="#e2e8f0" />
      <rect x="440" y="90" width="320" height="9" rx="3" fill="#e2e8f0" />
      <rect x="440" y="107" width="280" height="9" rx="3" fill="#e2e8f0" />
      <rect x="440" y="128" width="320" height="9" rx="3" fill="#e2e8f0" />
      <rect x="440" y="145" width="260" height="9" rx="3" fill="#e2e8f0" />
      <rect x="440" y="172" width="100" height="32" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
    </svg>
  );
}
