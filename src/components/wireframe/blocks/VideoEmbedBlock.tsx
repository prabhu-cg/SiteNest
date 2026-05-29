export default function VideoEmbedBlock() {
  return (
    <svg viewBox="0 0 800 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="240" fill="#f8fafc" />
      {/* Video frame */}
      <rect x="40" y="20" width="720" height="200" rx="10" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1" />
      {/* Progress bar area */}
      <rect x="40" y="198" width="720" height="22" rx="0" fill="#0f172a" />
      <rect x="56" y="206" width="560" height="4" rx="2" fill="#334155" />
      <rect x="56" y="206" width="180" height="4" rx="2" fill="#EE661D" opacity="0.8" />
      <circle cx="236" cy="208" r="5" fill="#EE661D" />
      {/* Play button */}
      <circle cx="400" cy="105" r="32" fill="#ffffff22" stroke="#ffffff44" strokeWidth="1.5" />
      <polygon points="390,90 390,120 422,105" fill="#ffffffcc" />
      {/* Top bar icons */}
      <rect x="640" y="30" width="40" height="8" rx="3" fill="#334155" />
      <rect x="692" y="30" width="16" height="8" rx="3" fill="#334155" />
      <rect x="720" y="30" width="16" height="8" rx="3" fill="#334155" />
    </svg>
  );
}
