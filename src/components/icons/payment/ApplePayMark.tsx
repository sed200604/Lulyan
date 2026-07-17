export function ApplePayMark({ className = '', style, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className} style={style} aria-label="Apple Pay" role="img" {...props}>
      <rect width="100" height="60" rx="10" fill="currentColor" />
      <text x="50" y="38" fontSize="20" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Pay</text>
      <circle cx="25" cy="30" r="10" fill="white" />
    </svg>
  );
}
