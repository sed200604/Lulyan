export function CBMark({ className = '', style, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className} style={style} aria-label="CB" role="img" {...props}>
      <rect width="100" height="60" rx="10" fill="currentColor" />
      <text x="50" y="40" fontSize="30" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CB</text>
    </svg>
  );
}
