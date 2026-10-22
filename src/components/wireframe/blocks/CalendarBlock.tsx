export default function CalendarBlock() {
  const cols = [0, 1, 2, 3, 4, 5, 6];
  const rows = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#ffffff" />
      {/* Header */}
      <rect x="40" y="20" width="140" height="16" rx="4" fill="#334155" />
      <rect x="640" y="16" width="56" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="704" y="16" width="56" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Weekday labels */}
      {cols.map((c) => (
        <rect key={c} x={48 + c * 100} y="58" width="40" height="9" rx="3" fill="#94a3b8" />
      ))}
      {/* Day cells */}
      {rows.map((r) =>
        cols.map((c) => (
          <rect key={`${r}-${c}`} x={40 + c * 102} y={78 + r * 48} width="98" height="44" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        ))
      )}
      {/* Events */}
      <rect x="146" y="106" width="86" height="12" rx="3" fill="#C74504" />
      <rect x="350" y="154" width="86" height="12" rx="3" fill="#334155" />
      <rect x="554" y="202" width="86" height="12" rx="3" fill="#94a3b8" />
    </svg>
  );
}
