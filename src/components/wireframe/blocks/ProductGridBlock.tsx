export default function ProductGridBlock() {
  return (
    <svg viewBox="0 0 800 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="300" fill="#ffffff" />
      {[32, 232, 432, 632].map((x, i) => (
        <g key={i}>
          <rect x={x} y="24" width="136" height="136" rx="8" fill="#e2e8f0" />
          <rect x={x} y="172" width="112" height="12" rx="3" fill="#334155" />
          <rect x={x} y="192" width="72" height="10" rx="3" fill="#94a3b8" />
          <rect x={x} y="212" width="52" height="14" rx="3" fill="#C74504" />
          <rect x={x} y="242" width="136" height="32" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
