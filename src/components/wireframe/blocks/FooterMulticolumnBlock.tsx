export default function FooterMulticolumnBlock() {
  return (
    <svg viewBox="0 0 800 200" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" fill="#1e293b" />
      <rect width="800" height="1" fill="#334155" />
      {/* Logo & tagline column */}
      <rect x="40" y="32" width="28" height="20" rx="4" fill="#334155" />
      <rect x="76" y="37" width="80" height="10" rx="3" fill="#475569" />
      <rect x="40" y="64" width="160" height="8" rx="3" fill="#334155" />
      <rect x="40" y="80" width="140" height="8" rx="3" fill="#334155" />
      {/* Social icons */}
      {[40, 68, 96, 124].map((x, i) => (
        <rect key={i} x={x} y="104" width="20" height="20" rx="4" fill="#334155" />
      ))}
      {/* Link columns */}
      {[260, 420, 580].map((x, col) => (
        <g key={col}>
          <rect x={x} y="32" width="80" height="11" rx="3" fill="#64748b" />
          {[54, 74, 94, 114, 134].map((y, row) => (
            <rect key={row} x={x} y={y} width={row % 2 === 0 ? 100 : 80} height="8" rx="3" fill="#334155" />
          ))}
        </g>
      ))}
      {/* Bottom bar */}
      <rect x="0" y="166" width="800" height="1" fill="#334155" />
      <rect x="40" y="176" width="200" height="8" rx="3" fill="#334155" />
      <rect x="560" y="176" width="200" height="8" rx="3" fill="#334155" />
    </svg>
  );
}
