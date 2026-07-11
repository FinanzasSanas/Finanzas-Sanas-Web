export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="3" y="3" width="94" height="94" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="3" x2="50" y2="97" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="50" x2="97" y2="50" stroke="currentColor" strokeWidth="2" />
      <path
        d="M25 36 Q14 25 25 14 Q36 25 25 36 Z M25 18 L25 32"
        fill="none"
        stroke="#6FA184"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g stroke="#BD8B40" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <line x1="62" y1="36" x2="62" y2="24" />
        <line x1="70" y1="36" x2="70" y2="15" />
        <line x1="78" y1="36" x2="78" y2="27" />
        <path d="M60 22 L70 12 L80 24" strokeLinejoin="round" />
      </g>
      <path d="M12 84 L25 62 L38 84 Z" fill="none" stroke="#6FA184" strokeWidth="2.6" strokeLinejoin="round" />
      <path
        d="M61 84 L61 74 L69 80 L74 66 L79 80 L87 74 L87 84 Z"
        fill="none"
        stroke="#BD8B40"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
