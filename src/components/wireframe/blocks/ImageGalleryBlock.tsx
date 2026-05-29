export default function ImageGalleryBlock() {
  return (
    <svg viewBox="0 0 800 280" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="280" fill="#ffffff" />
      {/* Section heading */}
      <rect x="280" y="20" width="240" height="18" rx="4" fill="#94a3b8" />
      {/* 3x2 image grid */}
      {[
        { x: 32, y: 56, w: 236, h: 96 },
        { x: 282, y: 56, w: 236, h: 96 },
        { x: 532, y: 56, w: 236, h: 96 },
        { x: 32, y: 164, w: 236, h: 96 },
        { x: 282, y: 164, w: 236, h: 96 },
        { x: 532, y: 164, w: 236, h: 96 },
      ].map((img, i) => (
        <g key={i}>
          <rect x={img.x} y={img.y} width={img.w} height={img.h} rx="6" fill="#e2e8f0" />
          <line x1={img.x} y1={img.y} x2={img.x + img.w} y2={img.y + img.h} stroke="#cbd5e1" strokeWidth="1" />
          <line x1={img.x + img.w} y1={img.y} x2={img.x} y2={img.y + img.h} stroke="#cbd5e1" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
