export default function HeroCenteredBlock() {
  return (
    <svg viewBox="0 0 800 280" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="280" fill="#f8fafc" />
      {/* Badge */}
      <rect x="325" y="44" width="150" height="20" rx="10" fill="#e2e8f0" />
      {/* Heading */}
      <rect x="160" y="82" width="480" height="24" rx="4" fill="#94a3b8" />
      <rect x="220" y="114" width="360" height="24" rx="4" fill="#94a3b8" />
      {/* Subtext */}
      <rect x="200" y="156" width="400" height="10" rx="3" fill="#cbd5e1" />
      <rect x="240" y="174" width="320" height="10" rx="3" fill="#cbd5e1" />
      {/* Buttons */}
      <rect x="248" y="208" width="128" height="36" rx="6" fill="#334155" />
      <rect x="392" y="208" width="128" height="36" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
    </svg>
  );
}
