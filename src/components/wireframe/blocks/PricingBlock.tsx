export default function PricingBlock() {
  return (
    <svg viewBox="0 0 800 340" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="340" fill="#f8fafc" />
      {/* Heading */}
      <rect x="280" y="24" width="240" height="18" rx="4" fill="#94a3b8" />
      <rect x="300" y="50" width="200" height="10" rx="3" fill="#cbd5e1" />
      {/* Three pricing cards */}
      {[
        { x: 32, featured: false },
        { x: 288, featured: true },
        { x: 544, featured: false },
      ].map(({ x, featured }, i) => (
        <g key={i}>
          <rect x={x} y="76" width="224" height="248" rx="10"
            fill={featured ? '#1e293b' : '#ffffff'}
            stroke={featured ? '#334155' : '#e2e8f0'} strokeWidth={featured ? 0 : 1}
          />
          {/* Plan name */}
          <rect x={x + 20} y="100" width="80" height="12" rx="3" fill={featured ? '#ffffff66' : '#94a3b8'} />
          {/* Price */}
          <rect x={x + 20} y="124" width="60" height="24" rx="4" fill={featured ? '#ffffffcc' : '#334155'} />
          <rect x={x + 88} y="134" width="40" height="10" rx="3" fill={featured ? '#ffffff55' : '#cbd5e1'} />
          {/* Features */}
          {[164, 186, 208, 230, 252].map((y, j) => (
            <g key={j}>
              <circle cx={x + 30} cy={y + 5} r="4" fill={featured ? '#EE661D' : '#e2e8f0'} />
              <rect x={x + 44} y={y} width={featured ? 140 : 130} height="9" rx="3" fill={featured ? '#ffffffaa' : '#e2e8f0'} />
            </g>
          ))}
          {/* CTA */}
          <rect x={x + 20} y="284" width="184" height="28" rx="6"
            fill={featured ? '#EE661D' : '#f1f5f9'}
            stroke={featured ? 'none' : '#e2e8f0'} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
