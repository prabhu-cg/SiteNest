export default function ReviewsBlock() {
  return (
    <svg viewBox="0 0 800 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="300" fill="#ffffff" />
      {/* Rating summary */}
      <rect x="40" y="32" width="70" height="40" rx="6" fill="#334155" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={52 + i * 20} cy="96" r="7" fill={i < 4 ? '#C74504' : '#e2e8f0'} />
      ))}
      <rect x="40" y="116" width="110" height="9" rx="3" fill="#94a3b8" />
      {[148, 164, 180, 196, 212].map((y, i) => (
        <g key={i}>
          <rect x="40" y={y} width="16" height="8" rx="2" fill="#94a3b8" />
          <rect x="64" y={y} width="100" height="8" rx="3" fill="#e2e8f0" />
          <rect x="64" y={y} width={100 - i * 18} height="8" rx="3" fill="#C74504" />
        </g>
      ))}
      {/* Review cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="240" y={24 + i * 88} width="520" height="76" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="268" cy={50 + i * 88} r="14" fill="#cbd5e1" />
          <rect x="294" y={40 + i * 88} width="100" height="10" rx="3" fill="#334155" />
          <rect x="294" y={56 + i * 88} width="70" height="8" rx="3" fill="#C74504" />
          <rect x="262" y={76 + i * 88} width="470" height="8" rx="3" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  );
}
