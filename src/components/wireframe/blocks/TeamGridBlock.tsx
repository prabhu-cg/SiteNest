export default function TeamGridBlock() {
  const cards = [40, 284, 528];
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#ffffff" />
      <rect x="280" y="20" width="240" height="16" rx="4" fill="#94a3b8" />
      <rect x="220" y="44" width="360" height="8" rx="3" fill="#e2e8f0" />
      {cards.map((x, i) => (
        <g key={i}>
          <rect x={x} y="72" width="228" height="232" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx={x + 114} cy="144" r="44" fill="#e2e8f0" />
          <rect x={x + 54} y="200" width="120" height="11" rx="3" fill="#334155" />
          <rect x={x + 64} y="218" width="100" height="8" rx="2" fill="#94a3b8" />
          <rect x={x + 44} y="234" width="140" height="7" rx="2" fill="#e2e8f0" />
          <rect x={x + 44} y="247" width="120" height="7" rx="2" fill="#e2e8f0" />
          <rect x={x + 64} y="268" width="22" height="22" rx="5" fill="#e2e8f0" />
          <rect x={x + 92} y="268" width="22" height="22" rx="5" fill="#e2e8f0" />
          <rect x={x + 120} y="268" width="22" height="22" rx="5" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  );
}
