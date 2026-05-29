export default function TestimonialBlock() {
  return (
    <svg viewBox="0 0 800 200" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" fill="#f8fafc" />
      {/* Quote marks */}
      <text x="40" y="72" fontSize="72" fill="#e2e8f0" fontFamily="serif">"</text>
      {/* Quote text */}
      <rect x="88" y="48" width="600" height="14" rx="3" fill="#94a3b8" />
      <rect x="88" y="70" width="560" height="14" rx="3" fill="#94a3b8" />
      <rect x="88" y="92" width="420" height="14" rx="3" fill="#94a3b8" />
      {/* Author */}
      <circle cx="88" cy="148" r="20" fill="#e2e8f0" />
      <rect x="119" y="138" width="120" height="12" rx="3" fill="#64748b" />
      <rect x="119" y="158" width="80" height="9" rx="3" fill="#cbd5e1" />
      {/* Stars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i}
          points={`${280 + i * 22},138 ${284 + i * 22},148 ${294 + i * 22},148 ${286 + i * 22},154 ${289 + i * 22},164 ${280 + i * 22},158 ${271 + i * 22},164 ${274 + i * 22},154 ${266 + i * 22},148 ${276 + i * 22},148`}
          fill="#EE661D" opacity="0.8"
        />
      ))}
    </svg>
  );
}
