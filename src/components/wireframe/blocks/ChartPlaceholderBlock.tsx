export default function ChartPlaceholderBlock() {
  return (
    <svg viewBox="0 0 800 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="240" fill="#ffffff" />
      {/* Chart area */}
      <rect x="40" y="20" width="720" height="180" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      {/* Y axis */}
      <line x1="80" y1="36" x2="80" y2="172" stroke="#e2e8f0" strokeWidth="1" />
      {/* X axis */}
      <line x1="80" y1="172" x2="736" y2="172" stroke="#e2e8f0" strokeWidth="1" />
      {/* Y axis labels */}
      {[36, 72, 108, 144].map((y, i) => (
        <rect key={i} x="48" y={y + 4} width="24" height="8" rx="2" fill="#e2e8f0" />
      ))}
      {/* Bars */}
      {[
        { x: 104, h: 60, fill: '#94a3b8' },
        { x: 188, h: 100, fill: '#EE661D' },
        { x: 272, h: 80, fill: '#94a3b8' },
        { x: 356, h: 120, fill: '#94a3b8' },
        { x: 440, h: 90, fill: '#EE661D' },
        { x: 524, h: 140, fill: '#94a3b8' },
        { x: 608, h: 70, fill: '#94a3b8' },
        { x: 692, h: 110, fill: '#94a3b8' },
      ].map((bar, i) => (
        <g key={i}>
          <rect x={bar.x} y={172 - bar.h} width="56" height={bar.h} rx="3 3 0 0" fill={bar.fill} opacity="0.7" />
          <rect x={bar.x + 12} y={180} width="32" height="8" rx="2" fill="#e2e8f0" />
        </g>
      ))}
      {/* Legend */}
      <rect x="40" y="210" width="12" height="12" rx="2" fill="#94a3b8" />
      <rect x="60" y="214" width="60" height="8" rx="2" fill="#e2e8f0" />
      <rect x="140" y="210" width="12" height="12" rx="2" fill="#EE661D" opacity="0.7" />
      <rect x="160" y="214" width="60" height="8" rx="2" fill="#e2e8f0" />
    </svg>
  );
}
