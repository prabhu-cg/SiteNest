function Card({ x }: { x: number }) {
  return (
    <>
      <rect x={x} y="60" width="228" height="180" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Card image */}
      <rect x={x} y="60" width="228" height="96" rx="8" fill="#e2e8f0" />
      <rect x={x} y="140" width="228" height="16" rx="0" fill="#e2e8f0" />
      {/* image X lines */}
      <line x1={x} y1="60" x2={x + 228} y2="156" stroke="#cbd5e1" strokeWidth="1" />
      <line x1={x + 228} y1="60" x2={x} y2="156" stroke="#cbd5e1" strokeWidth="1" />
      {/* Title */}
      <rect x={x + 16} y="172" width="120" height="12" rx="4" fill="#94a3b8" />
      {/* Text lines */}
      <rect x={x + 16} y="194" width="196" height="8" rx="4" fill="#e2e8f0" />
      <rect x={x + 16} y="208" width="160" height="8" rx="4" fill="#e2e8f0" />
      {/* Link */}
      <rect x={x + 16} y="224" width="72" height="8" rx="4" fill="#94a3b8" />
    </>
  );
}

export default function CardGridBlock() {
  return (
    <svg viewBox="0 0 800 260" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="260" fill="#f8fafc" />
      {/* Section heading */}
      <rect x="268" y="20" width="264" height="18" rx="4" fill="#94a3b8" />
      <Card x={28} />
      <Card x={286} />
      <Card x={544} />
    </svg>
  );
}
