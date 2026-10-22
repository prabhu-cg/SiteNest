export default function CheckoutBlock() {
  return (
    <svg viewBox="0 0 800 340" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="340" fill="#f8fafc" />
      {/* Form column */}
      <rect x="40" y="24" width="440" height="292" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="64" y="44" width="140" height="14" rx="4" fill="#334155" />
      {[72, 128, 184].map((y, i) => (
        <g key={i}>
          <rect x="64" y={y} width="80" height="9" rx="3" fill="#94a3b8" />
          <rect x="64" y={y + 14} width="392" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="64" y="256" width="392" height="40" rx="6" fill="#C74504" />
      {/* Order summary */}
      <rect x="508" y="24" width="252" height="292" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="528" y="44" width="110" height="14" rx="4" fill="#334155" />
      {[76, 124].map((y, i) => (
        <g key={i}>
          <rect x="528" y={y} width="40" height="40" rx="6" fill="#e2e8f0" />
          <rect x="578" y={y + 6} width="100" height="10" rx="3" fill="#94a3b8" />
          <rect x="578" y={y + 24} width="60" height="9" rx="3" fill="#e2e8f0" />
          <rect x="710" y={y + 14} width="30" height="10" rx="3" fill="#94a3b8" />
        </g>
      ))}
      <line x1="528" y1="188" x2="740" y2="188" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="528" y="204" width="70" height="10" rx="3" fill="#94a3b8" />
      <rect x="700" y="204" width="40" height="10" rx="3" fill="#94a3b8" />
      <rect x="528" y="236" width="90" height="14" rx="3" fill="#334155" />
      <rect x="690" y="236" width="50" height="14" rx="3" fill="#334155" />
    </svg>
  );
}
