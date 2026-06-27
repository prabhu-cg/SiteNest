export default function TimelineBlock() {
  const entries = [
    { side: 'left',  y: 48 },
    { side: 'right', y: 136 },
    { side: 'left',  y: 224 },
    { side: 'right', y: 312 },
  ];
  return (
    <svg viewBox="0 0 800 400" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="400" fill="#ffffff" />
      {/* Centre line */}
      <rect x="399" y="20" width="2" height="360" fill="#e2e8f0" />
      {entries.map(({ side, y }, i) => {
        const isLeft = side === 'left';
        const cardX = isLeft ? 40 : 440;
        const dotX = 400;
        return (
          <g key={i}>
            {/* Dot */}
            <circle cx={dotX} cy={y + 36} r="8" fill="#334155" />
            {/* Connector line */}
            <rect x={isLeft ? dotX - 48 : dotX + 8} y={y + 34} width="40" height="4" fill="#e2e8f0" />
            {/* Card */}
            <rect x={cardX} y={y} width="320" height="72" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <rect x={cardX + 16} y={y + 14} width={isLeft ? 160 : 140} height="10" rx="3" fill="#334155" />
            <rect x={cardX + 16} y={y + 30} width="60" height="7" rx="2" fill="#94a3b8" />
            <rect x={cardX + 16} y={y + 44} width="240" height="7" rx="2" fill="#e2e8f0" />
            <rect x={cardX + 16} y={y + 57} width="200" height="7" rx="2" fill="#e2e8f0" />
          </g>
        );
      })}
    </svg>
  );
}
