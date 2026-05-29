export default function TextBlock() {
  return (
    <svg viewBox="0 0 800 220" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="220" fill="#ffffff" />
      {/* Heading */}
      <rect x="40" y="32" width="280" height="20" rx="4" fill="#94a3b8" />
      {/* Body text lines */}
      <rect x="40" y="70" width="720" height="10" rx="3" fill="#e2e8f0" />
      <rect x="40" y="88" width="680" height="10" rx="3" fill="#e2e8f0" />
      <rect x="40" y="106" width="700" height="10" rx="3" fill="#e2e8f0" />
      <rect x="40" y="124" width="640" height="10" rx="3" fill="#e2e8f0" />
      {/* Second paragraph */}
      <rect x="40" y="152" width="720" height="10" rx="3" fill="#e2e8f0" />
      <rect x="40" y="170" width="660" height="10" rx="3" fill="#e2e8f0" />
      <rect x="40" y="188" width="400" height="10" rx="3" fill="#e2e8f0" />
    </svg>
  );
}
