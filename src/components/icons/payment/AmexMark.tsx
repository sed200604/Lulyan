export function AmexMark({ className = '', style, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className} style={style} aria-label="Amex" role="img" {...props}>
      <rect width="100" height="60" rx="10" fill="currentColor" />
      <text x="50" y="38" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AMEX</text>
    </svg>
  );
}
