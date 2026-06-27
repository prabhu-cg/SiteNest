export default function KanbanBlock() {
  const columns = [
    { label: 'To Do',      x: 20,  cards: [60, 152, 244] },
    { label: 'In Progress', x: 293, cards: [60, 152]      },
    { label: 'Done',        x: 567, cards: [60, 152, 244, 336] },
  ];
  const tagColors = ['#fef3c7', '#dbeafe', '#f3e8ff', '#dcfce7'];

  return (
    <svg viewBox="0 0 800 420" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="420" fill="#f8fafc" />
      {columns.map(({ label: _label, x, cards }) => (
        <g key={x}>
          {/* Column */}
          <rect x={x} y="16" width="253" height="388" rx="10" fill="#f1f5f9" />
          {/* Column header */}
          <rect x={x + 12} y="28" width="140" height="10" rx="3" fill="#334155" />
          <rect x={x + 205} y="24" width="36" height="20" rx="10" fill="#e2e8f0" />
          <rect x={x + 213} y="29" width="20" height="10" rx="2" fill="#94a3b8" />
          {/* Cards */}
          {cards.map((cy, j) => (
            <g key={j}>
              <rect x={x + 12} y={cy} width="229" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              {/* Tag */}
              <rect x={x + 24} y={cy + 12} width="60" height="16" rx="8" fill={tagColors[j % tagColors.length]} />
              <rect x={x + 34} y={cy + 17} width="40" height="6" rx="2" fill="#94a3b8" />
              {/* Title */}
              <rect x={x + 24} y={cy + 36} width={140 - j * 8} height="9" rx="2" fill="#334155" />
              {/* Meta row */}
              <circle cx={x + 32} cy={cy + 64} r="8" fill="#e2e8f0" />
              <rect x={x + 46} y={cy + 60} width="60" height="7" rx="2" fill="#e2e8f0" />
              <rect x={x + 188} y={cy + 58} width="40" height="12" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            </g>
          ))}
          {/* Add card */}
          <rect x={x + 12} y={cards[cards.length - 1] + 92} width="229" height="32" rx="8"
            fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />
          <rect x={x + 88} y={cards[cards.length - 1] + 104} width="80" height="8" rx="2" fill="#cbd5e1" />
        </g>
      ))}
    </svg>
  );
}
