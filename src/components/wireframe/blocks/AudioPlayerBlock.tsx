export default function AudioPlayerBlock() {
  const bars = [24, 36, 52, 44, 60, 48, 32, 56, 40, 28, 52, 44, 36, 60, 48, 32, 56, 40, 52, 28, 36, 60, 44, 48];
  return (
    <svg viewBox="0 0 800 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="160" fill="#ffffff" />
      {/* Album art */}
      <rect x="40" y="24" width="112" height="112" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="96" cy="80" r="28" fill="#e2e8f0" />
      <circle cx="96" cy="80" r="10" fill="#cbd5e1" />
      {/* Track info */}
      <rect x="172" y="30" width="200" height="12" rx="3" fill="#334155" />
      <rect x="172" y="50" width="140" height="8" rx="2" fill="#94a3b8" />
      {/* Waveform */}
      {bars.map((h, i) => {
        const barX = 172 + i * 16;
        const progress = i < 10;
        return (
          <rect key={i} x={barX} y={84 - h / 2} width="8" height={h} rx="3"
            fill={progress ? '#334155' : '#e2e8f0'} />
        );
      })}
      {/* Time */}
      <rect x="172" y="110" width="32" height="8" rx="2" fill="#94a3b8" />
      <rect x="548" y="110" width="40" height="8" rx="2" fill="#94a3b8" />
      {/* Controls */}
      <rect x="600" y="32" width="32" height="32" rx="6" fill="#f1f5f9" />
      <rect x="644" y="24" width="40" height="40" rx="20" fill="#334155" />
      <rect x="654" y="36" width="20" height="16" rx="3" fill="#ffffff" />
      <rect x="696" y="32" width="32" height="32" rx="6" fill="#f1f5f9" />
      {/* Volume */}
      <rect x="600" y="82" width="8" height="8" rx="2" fill="#e2e8f0" />
      <rect x="616" y="80" width="112" height="4" rx="2" fill="#e2e8f0" />
      <rect x="616" y="80" width="70" height="4" rx="2" fill="#334155" />
      <circle cx="686" cy="82" r="6" fill="#334155" />
    </svg>
  );
}
