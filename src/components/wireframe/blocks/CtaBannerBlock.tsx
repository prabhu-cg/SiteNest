export default function CtaBannerBlock() {
  return (
    <svg viewBox="0 0 800 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="160" fill="#1e293b" />
      {/* Decorative circles */}
      <circle cx="80" cy="80" r="120" fill="#334155" opacity="0.5" />
      <circle cx="720" cy="80" r="100" fill="#334155" opacity="0.5" />
      {/* Heading */}
      <rect x="160" y="44" width="360" height="22" rx="4" fill="#ffffff99" />
      <rect x="200" y="74" width="280" height="14" rx="3" fill="#ffffff55" />
      {/* Buttons */}
      <rect x="200" y="108" width="140" height="36" rx="6" fill="#EE661D" />
      <rect x="356" y="108" width="140" height="36" rx="6" fill="#ffffff22" stroke="#ffffff33" strokeWidth="1.5" />
    </svg>
  );
}
