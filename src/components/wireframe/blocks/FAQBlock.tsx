export default function FAQBlock() {
  const items = [
    { expanded: true },
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false },
  ];
  let y = 72;
  const rows: { y: number; expanded: boolean }[] = [];
  items.forEach((item) => { rows.push({ y, expanded: item.expanded }); y += item.expanded ? 80 : 48; });

  return (
    <svg viewBox="0 0 800 340" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="340" fill="#ffffff" />
      <rect x="240" y="20" width="320" height="16" rx="4" fill="#94a3b8" />
      <rect x="200" y="44" width="400" height="8" rx="3" fill="#e2e8f0" />
      {rows.map(({ y: ry, expanded }, i) => (
        <g key={i}>
          <rect x="40" y={ry} width="720" height={expanded ? 72 : 40} rx="6" fill={expanded ? '#f8fafc' : '#ffffff'} stroke="#e2e8f0" strokeWidth="1" />
          <rect x="60" y={ry + 15} width={expanded ? 300 : 340} height="10" rx="3" fill="#334155" />
          {/* +/- icon */}
          <rect x="736" y={ry + 15} width="14" height="3" rx="1.5" fill="#94a3b8" />
          {!expanded && <rect x="741.5" y={ry + 9} width="3" height="15" rx="1.5" fill="#94a3b8" />}
          {expanded && (
            <>
              <rect x="60" y={ry + 36} width="560" height="7" rx="2" fill="#e2e8f0" />
              <rect x="60" y={ry + 50} width="480" height="7" rx="2" fill="#e2e8f0" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
