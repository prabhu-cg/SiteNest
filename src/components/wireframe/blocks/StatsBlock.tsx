export default function StatsBlock() {
  return (
    <svg viewBox="0 0 800 120" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="120" fill="#ffffff" />
      {/* Four stat items */}
      {[40, 230, 420, 610].map((x, i) => (
        <g key={i}>
          <rect x={x} y="28" width="120" height="28" rx="4" fill="#334155" />
          <rect x={x} y="66" width="140" height="12" rx="3" fill="#94a3b8" />
          <rect x={x} y="84" width="100" height="9" rx="3" fill="#e2e8f0" />
          {/* Divider between items */}
          {i < 3 && <line x1={x + 170} y1="28" x2={x + 170} y2="96" stroke="#f1f5f9" strokeWidth="1" />}
        </g>
      ))}
    </svg>
  );
}
