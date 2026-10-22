export default function ProductDetailBlock() {
  return (
    <svg viewBox="0 0 800 340" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="340" fill="#ffffff" />
      {/* Gallery */}
      <rect x="40" y="24" width="320" height="240" rx="10" fill="#e2e8f0" />
      {[40, 124, 208, 292].map((x, i) => (
        <rect key={i} x={x} y="276" width="68" height="48" rx="6" fill="#cbd5e1" />
      ))}
      {/* Info */}
      <rect x="400" y="32" width="300" height="22" rx="4" fill="#334155" />
      <rect x="400" y="64" width="120" height="12" rx="3" fill="#94a3b8" />
      <rect x="400" y="94" width="90" height="26" rx="4" fill="#C74504" />
      <rect x="400" y="136" width="340" height="10" rx="3" fill="#e2e8f0" />
      <rect x="400" y="154" width="320" height="10" rx="3" fill="#e2e8f0" />
      <rect x="400" y="172" width="280" height="10" rx="3" fill="#e2e8f0" />
      {/* Variant chips */}
      {[400, 456, 512].map((x, i) => (
        <rect key={i} x={x} y="204" width="44" height="30" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      ))}
      {/* Add to cart */}
      <rect x="400" y="252" width="220" height="40" rx="6" fill="#334155" />
      <rect x="632" y="252" width="40" height="40" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    </svg>
  );
}
