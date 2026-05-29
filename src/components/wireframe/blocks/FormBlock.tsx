function InputField({ y, labelW = 80 }: { y: number; labelW?: number }) {
  return (
    <>
      <rect x="200" y={y} width={labelW} height="10" rx="4" fill="#94a3b8" />
      <rect x="200" y={y + 18} width="400" height="32" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
    </>
  );
}

export default function FormBlock() {
  return (
    <svg viewBox="0 0 800 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="320" fill="#f8fafc" />
      {/* Centered form card */}
      <rect x="140" y="20" width="520" height="280" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Heading */}
      <rect x="280" y="44" width="240" height="18" rx="4" fill="#94a3b8" />
      {/* Subtext */}
      <rect x="240" y="70" width="320" height="10" rx="4" fill="#e2e8f0" />
      {/* Two-col row */}
      <rect x="200" y="102" width="80" height="10" rx="4" fill="#94a3b8" />
      <rect x="200" y="120" width="188" height="32" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="412" y="102" width="80" height="10" rx="4" fill="#94a3b8" />
      <rect x="412" y="120" width="188" height="32" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Email */}
      <InputField y={174} labelW={100} />
      {/* Checkbox row */}
      <rect x="200" y="230" width="16" height="16" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="224" y="234" width="180" height="8" rx="4" fill="#e2e8f0" />
      {/* Submit */}
      <rect x="200" y="260" width="400" height="36" rx="6" fill="#334155" />
    </svg>
  );
}
