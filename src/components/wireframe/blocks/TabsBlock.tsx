export default function TabsBlock() {
  return (
    <svg viewBox="0 0 800 56" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="56" fill="#ffffff" />
      <rect width="800" height="1" y="55" fill="#e2e8f0" />
      {/* Tab items */}
      {[
        { x: 32, w: 80, active: true },
        { x: 128, w: 88, active: false },
        { x: 232, w: 72, active: false },
        { x: 320, w: 96, active: false },
        { x: 432, w: 80, active: false },
      ].map((tab, i) => (
        <g key={i}>
          <rect x={tab.x} y="20" width={tab.w} height="12" rx="3" fill={tab.active ? '#334155' : '#cbd5e1'} />
          {tab.active && <rect x={tab.x} y="54" width={tab.w} height="2" rx="1" fill="#EE661D" />}
        </g>
      ))}
    </svg>
  );
}
