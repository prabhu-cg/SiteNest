export default function LogoBarBlock() {
  const logos = [96, 80, 112, 72, 100, 88];
  const totalW = logos.reduce((a, b) => a + b, 0) + 40 * (logos.length - 1);
  const startX = (800 - totalW) / 2;
  let cx = startX;

  return (
    <svg viewBox="0 0 800 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="160" fill="#ffffff" />
      <rect x="260" y="20" width="280" height="10" rx="3" fill="#cbd5e1" />
      {logos.map((w, i) => {
        const x = cx;
        cx += w + 40;
        return (
          <g key={i}>
            <rect x={x} y="60" width={w} height="40" rx="6" fill="#f1f5f9" />
            <rect x={x + 12} y="75" width={w - 24} height="10" rx="3" fill="#cbd5e1" />
          </g>
        );
      })}
      <rect x="200" y="130" width="400" height="7" rx="2" fill="#e2e8f0" />
    </svg>
  );
}
