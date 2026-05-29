export default function NewsletterBlock() {
  return (
    <svg viewBox="0 0 800 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="160" fill="#f8fafc" />
      {/* Heading */}
      <rect x="240" y="28" width="320" height="18" rx="4" fill="#94a3b8" />
      <rect x="280" y="54" width="240" height="10" rx="3" fill="#cbd5e1" />
      {/* Email input + button */}
      <rect x="180" y="84" width="320" height="40" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="200" y="97" width="140" height="12" rx="3" fill="#e2e8f0" />
      <rect x="516" y="84" width="120" height="40" rx="6" fill="#334155" />
      {/* Privacy note */}
      <rect x="300" y="136" width="200" height="8" rx="3" fill="#e2e8f0" />
    </svg>
  );
}
