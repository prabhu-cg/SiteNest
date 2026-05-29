export default function TableBlock() {
  return (
    <svg viewBox="0 0 800 280" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="280" fill="#ffffff" />
      {/* Table container */}
      <rect x="32" y="20" width="736" height="248" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Header row */}
      <rect x="32" y="20" width="736" height="40" rx="8" fill="#f8fafc" />
      <rect x="32" y="58" width="736" height="1" fill="#e2e8f0" />
      {/* Header cells */}
      {[56, 224, 392, 560, 688].map((x, i) => (
        <rect key={i} x={x} y="34" width={i === 4 ? 64 : 128} height="12" rx="3" fill="#94a3b8" />
      ))}
      {/* Data rows */}
      {[60, 100, 140, 180, 220].map((y, row) => (
        <g key={row}>
          <rect x="32" y={y + 38} width="736" height="1" fill="#f1f5f9" />
          {[56, 224, 392, 560, 688].map((x, col) => (
            <rect key={col} x={x} y={y + 46} width={col === 4 ? 56 : 100} height="9" rx="3"
              fill={col === 4 ? '#EE661D' : col === 0 ? '#64748b' : '#e2e8f0'} opacity={col === 4 ? 0.6 : 1} />
          ))}
        </g>
      ))}
    </svg>
  );
}
