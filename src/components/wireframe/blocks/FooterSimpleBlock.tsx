export default function FooterSimpleBlock() {
  return (
    <svg viewBox="0 0 800 80" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="80" fill="#1e293b" />
      <rect width="800" height="1" fill="#334155" />
      {/* Logo */}
      <rect x="32" y="28" width="28" height="20" rx="4" fill="#334155" />
      <rect x="68" y="33" width="80" height="10" rx="3" fill="#475569" />
      {/* Links */}
      {[280, 360, 440, 520, 600].map((x, i) => (
        <rect key={i} x={x} y="34" width="60" height="8" rx="3" fill="#475569" />
      ))}
      {/* Copyright */}
      <rect x="600" y="34" width="140" height="8" rx="3" fill="#334155" />
    </svg>
  );
}
