export default function ImageFullBlock() {
  return (
    <svg viewBox="0 0 800 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="240" fill="#e2e8f0" />
      <line x1="0" y1="0" x2="800" y2="240" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="800" y1="0" x2="0" y2="240" stroke="#cbd5e1" strokeWidth="1" />
      {/* Image icon */}
      <rect x="352" y="96" width="56" height="48" rx="6" fill="#cbd5e1" />
      <circle cx="364" cy="108" r="6" fill="#94a3b8" />
      <path d="M348 136 l18-20 14 16 10-10 18 14" fill="none" stroke="#94a3b8" strokeWidth="2" />
      {/* Caption bar */}
      <rect x="0" y="200" width="800" height="40" fill="#00000033" />
      <rect x="32" y="212" width="180" height="10" rx="3" fill="#ffffff88" />
      <rect x="32" y="228" width="120" height="8" rx="3" fill="#ffffff55" />
    </svg>
  );
}
