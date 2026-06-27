export default function PaginationBlock() {
  const pages = ['‹', '1', '2', '3', '...', '8', '›'];
  const btnW = 40;
  const gap = 8;
  const totalW = pages.length * btnW + (pages.length - 1) * gap;
  const startX = (800 - totalW) / 2;
  return (
    <svg viewBox="0 0 800 80" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="80" fill="#ffffff" />
      {pages.map((_, i) => {
        const x = startX + i * (btnW + gap);
        const isActive = i === 2;
        return (
          <g key={i}>
            <rect x={x} y="20" width={btnW} height={btnW} rx="8"
              fill={isActive ? '#334155' : '#f8fafc'}
              stroke={isActive ? '#334155' : '#e2e8f0'}
              strokeWidth="1" />
            <rect x={x + 12} y="34" width={16} height="12" rx="2"
              fill={isActive ? '#ffffff' : '#94a3b8'} />
          </g>
        );
      })}
    </svg>
  );
}
