export default function ProfilePageBlock() {
  return (
    <svg viewBox="0 0 800 360" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="360" fill="#f8fafc" />
      {/* Cover image */}
      <rect width="800" height="140" fill="#e2e8f0" />
      <rect x="0" y="110" width="800" height="30" fill="url(#fade)" opacity="0.4" />
      {/* Avatar */}
      <circle cx="100" cy="140" r="52" fill="#ffffff" />
      <circle cx="100" cy="140" r="44" fill="#cbd5e1" />
      {/* Name + username */}
      <rect x="168" y="150" width="200" height="14" rx="4" fill="#334155" />
      <rect x="168" y="172" width="120" height="9" rx="2" fill="#94a3b8" />
      {/* Action buttons */}
      <rect x="616" y="152" width="80" height="32" rx="6" fill="#334155" />
      <rect x="704" y="152" width="80" height="32" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      {/* Bio */}
      <rect x="40" y="206" width="360" height="8" rx="2" fill="#e2e8f0" />
      <rect x="40" y="220" width="300" height="8" rx="2" fill="#e2e8f0" />
      {/* Stats row */}
      {[40, 180, 320].map((x, i) => (
        <g key={i}>
          <rect x={x} y="244" width="60" height="12" rx="3" fill="#334155" />
          <rect x={x} y="262" width="80" height="8" rx="2" fill="#94a3b8" />
        </g>
      ))}
      {/* Tabs */}
      <rect x="40" y="288" width="720" height="1" fill="#e2e8f0" />
      {[40, 140, 240, 340].map((x, i) => (
        <g key={i}>
          <rect x={x} y="272" width="80" height="14" rx="2" fill={i === 0 ? '#334155' : '#e2e8f0'} opacity={i === 0 ? 1 : 0.5} />
          {i === 0 && <rect x={x} y="286" width="80" height="3" rx="1.5" fill="#334155" />}
        </g>
      ))}
      {/* Post grid */}
      {[40, 204, 368, 532, 696].map((x, i) => (
        i < 5 && (
          <g key={i}>
            <rect x={x} y="304" width="148" height="48" rx="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <rect x={x + 12} y="316" width={80 - i * 4} height="8" rx="2" fill="#94a3b8" />
            <rect x={x + 12} y="330" width={100 - i * 6} height="6" rx="2" fill="#e2e8f0" />
          </g>
        )
      ))}
    </svg>
  );
}
