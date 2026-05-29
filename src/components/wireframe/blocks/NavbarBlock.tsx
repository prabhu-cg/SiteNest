export default function NavbarBlock() {
  return (
    <svg viewBox="0 0 800 64" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="64" fill="#ffffff" />
      <rect width="800" height="1" y="63" fill="#e2e8f0" />
      {/* Logo */}
      <rect x="28" y="20" width="32" height="24" rx="4" fill="#e2e8f0" />
      <rect x="68" y="26" width="64" height="12" rx="3" fill="#cbd5e1" />
      {/* Nav links */}
      <rect x="240" y="28" width="52" height="8" rx="4" fill="#e2e8f0" />
      <rect x="308" y="28" width="52" height="8" rx="4" fill="#e2e8f0" />
      <rect x="376" y="28" width="52" height="8" rx="4" fill="#e2e8f0" />
      <rect x="444" y="28" width="52" height="8" rx="4" fill="#e2e8f0" />
      {/* Sign in */}
      <rect x="640" y="20" width="72" height="26" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      {/* CTA button */}
      <rect x="724" y="20" width="48" height="26" rx="4" fill="#334155" />
    </svg>
  );
}
