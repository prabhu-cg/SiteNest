export default function StepperBlock() {
  const steps = [160, 320, 480, 640];
  const states: Array<'done' | 'active' | 'upcoming'> = ['done', 'active', 'upcoming', 'upcoming'];
  return (
    <svg viewBox="0 0 800 120" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="120" fill="#ffffff" />
      {/* Connector lines */}
      {steps.slice(0, -1).map((cx, i) => (
        <rect key={i} x={cx + 20} y="33" width={steps[i + 1] - cx - 40} height="2"
          fill={states[i] === 'done' ? '#334155' : '#e2e8f0'} />
      ))}
      {steps.map((cx, i) => {
        const s = states[i];
        const fill = s === 'done' ? '#334155' : s === 'active' ? '#334155' : '#f1f5f9';
        const stroke = s === 'upcoming' ? '#e2e8f0' : '#334155';
        return (
          <g key={i}>
            <circle cx={cx} cy="34" r="18" fill={fill} stroke={stroke} strokeWidth="1.5" />
            {s === 'done' && (
              <>
                <line x1={cx - 6} y1="34" x2={cx - 1} y2="40" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <line x1={cx - 1} y1="40" x2={cx + 8} y2="27" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
            {s !== 'done' && (
              <rect x={cx - 6} y="28" width="12" height="12" rx="2"
                fill={s === 'active' ? '#ffffff' : '#cbd5e1'} />
            )}
            <rect x={cx - 44} y="64" width="88" height="8" rx="2" fill="#334155" />
            <rect x={cx - 36} y="78" width="72" height="6" rx="2" fill="#e2e8f0" />
          </g>
        );
      })}
    </svg>
  );
}
