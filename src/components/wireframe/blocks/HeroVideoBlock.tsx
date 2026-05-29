export default function HeroVideoBlock() {
  return (
    <svg viewBox="0 0 800 280" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Video BG */}
      <rect width="800" height="280" fill="#1e293b" />
      <line x1="0" y1="0" x2="800" y2="280" stroke="#334155" strokeWidth="1" />
      <line x1="800" y1="0" x2="0" y2="280" stroke="#334155" strokeWidth="1" />
      {/* Overlay */}
      <rect width="800" height="280" fill="#00000066" />
      {/* Play button circle */}
      <circle cx="400" cy="100" r="28" fill="none" stroke="#ffffff99" strokeWidth="2" />
      <polygon points="392,88 392,112 418,100" fill="#ffffffcc" />
      {/* Heading */}
      <rect x="180" y="152" width="440" height="22" rx="4" fill="#ffffff99" />
      <rect x="240" y="182" width="320" height="14" rx="3" fill="#ffffff66" />
      {/* CTA */}
      <rect x="300" y="216" width="200" height="36" rx="6" fill="#EE661D" />
    </svg>
  );
}
