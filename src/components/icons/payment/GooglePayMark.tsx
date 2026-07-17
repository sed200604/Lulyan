export function GooglePayMark({ className = '', style, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className} style={style} aria-label="Google Pay" role="img" {...props}>
      <rect width="100" height="60" rx="10" fill="currentColor" />
      <text x="50" y="38" fontSize="20" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">G Pay</text>
    </svg>
  );
}
