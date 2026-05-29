export default function HeroSplitBlock() {
  return (
    <svg viewBox="0 0 800 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="300" fill="#f8fafc" />
      {/* Left: text content */}
      {/* Badge pill */}
      <rect x="40" y="48" width="100" height="20" rx="10" fill="#e2e8f0" />
      {/* Heading lines */}
      <rect x="40" y="84" width="300" height="22" rx="4" fill="#94a3b8" />
      <rect x="40" y="114" width="260" height="22" rx="4" fill="#94a3b8" />
      {/* Subtext */}
      <rect x="40" y="156" width="320" height="10" rx="4" fill="#cbd5e1" />
      <rect x="40" y="174" width="280" height="10" rx="4" fill="#cbd5e1" />
      <rect x="40" y="192" width="240" height="10" rx="4" fill="#cbd5e1" />
      {/* Buttons */}
      <rect x="40" y="226" width="128" height="36" rx="6" fill="#334155" />
      <rect x="180" y="226" width="128" height="36" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Right: image placeholder */}
      <rect x="440" y="32" width="330" height="236" rx="12" fill="#e2e8f0" />
      <line x1="440" y1="32" x2="770" y2="268" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="770" y1="32" x2="440" y2="268" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* image icon center */}
      <rect x="581" y="138" width="48" height="36" rx="4" fill="#cbd5e1" />
      <circle cx="591" cy="148" r="5" fill="#94a3b8" />
      <path d="M578 168 l16-18 12 14 8-8 16 12" fill="none" stroke="#94a3b8" strokeWidth="2" />
    </svg>
  );
}
