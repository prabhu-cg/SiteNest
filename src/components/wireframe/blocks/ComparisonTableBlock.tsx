export default function ComparisonTableBlock() {
  const cols = [
    { x: 220, highlight: false },
    { x: 400, highlight: true },
    { x: 580, highlight: false },
  ];
  const features = [100, 140, 180, 220, 260];
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#ffffff" />
      {/* Highlighted column bg */}
      <rect x="392" y="20" width="176" height="288" rx="8" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
      {/* Column headers */}
      {cols.map(({ x, highlight }) => (
        <g key={x}>
          <rect x={x + 8} y="28" width="160" height="48" rx="6"
            fill={highlight ? '#334155' : '#f1f5f9'} />
          <rect x={x + 28} y="40" width={80} height="10" rx="3"
            fill={highlight ? '#ffffff' : '#94a3b8'} />
          <rect x={x + 28} y="56" width={60} height="8" rx="2"
            fill={highlight ? 'rgba(255,255,255,0.6)' : '#cbd5e1'} />
        </g>
      ))}
      {/* Feature rows */}
      {features.map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="160" height="28" rx="0" fill="none" />
          <rect x="40" y={y + 8} width="120" height="8" rx="2" fill="#94a3b8" />
          <rect x="40" y={y + 27} width="720" height="1" fill="#f1f5f9" />
          {cols.map(({ x }) => {
            const check = Math.random() > 0.3;
            return (
              <g key={x}>
                {check ? (
                  <>
                    <circle cx={x + 88} cy={y + 14} r="9" fill="#dcfce7" />
                    <line x1={x + 83} y1={y + 14} x2={x + 87} y2={y + 18} stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                    <line x1={x + 87} y1={y + 18} x2={x + 93} y2={y + 10} stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx={x + 88} cy={y + 14} r="9" fill="#fee2e2" />
                    <line x1={x + 83} y1={y + 9} x2={x + 93} y2={y + 19} stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <line x1={x + 93} y1={y + 9} x2={x + 83} y2={y + 19} stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </g>
            );
          })}
        </g>
      ))}
      {/* CTA buttons */}
      {cols.map(({ x, highlight }) => (
        <rect key={x} x={x + 16} y="300" width="144" height="0" rx="5"
          fill={highlight ? '#334155' : '#f1f5f9'} />
      ))}
    </svg>
  );
}
