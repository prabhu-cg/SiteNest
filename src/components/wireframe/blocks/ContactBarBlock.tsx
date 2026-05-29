export default function ContactBarBlock() {
  return (
    <svg viewBox="0 0 800 80" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      {/* Three contact items */}
      {[80, 316, 552].map((x, i) => (
        <g key={i}>
          {/* Icon circle */}
          <circle cx={x + 20} cy="40" r="16" fill="#e2e8f0" />
          <rect cx={x + 16} cy="33" width="8" height="12" rx="2" fill="#94a3b8" />
          {/* Label + value */}
          <rect x={x + 46} y="28" width="80" height="10" rx="3" fill="#94a3b8" />
          <rect x={x + 46} y="44" width="120" height="9" rx="3" fill="#cbd5e1" />
        </g>
      ))}
    </svg>
  );
}
