export default function MapPlaceholderBlock() {
  return (
    <svg viewBox="0 0 800 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="240" fill="#e8f0e8" />
      {/* Map grid lines */}
      {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="240" stroke="#d1e0d1" strokeWidth="0.5" />
      ))}
      {[60, 120, 180].map((y) => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#d1e0d1" strokeWidth="0.5" />
      ))}
      {/* Road-like lines */}
      <path d="M0,120 Q200,80 400,120 T800,100" fill="none" stroke="#c8d8c8" strokeWidth="12" />
      <path d="M0,120 Q200,80 400,120 T800,100" fill="none" stroke="#dce8dc" strokeWidth="8" />
      <path d="M200,0 Q240,120 200,240" fill="none" stroke="#c8d8c8" strokeWidth="8" />
      <path d="M200,0 Q240,120 200,240" fill="none" stroke="#dce8dc" strokeWidth="5" />
      {/* Map pin */}
      <circle cx="400" cy="110" r="20" fill="#EE661D" opacity="0.9" />
      <circle cx="400" cy="110" r="8" fill="#ffffff" />
      <line x1="400" y1="130" x2="400" y2="146" stroke="#EE661D" strokeWidth="2.5" />
      {/* Pulse ring */}
      <circle cx="400" cy="110" r="32" fill="none" stroke="#EE661D" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
