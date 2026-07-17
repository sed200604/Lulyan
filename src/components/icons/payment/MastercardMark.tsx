export function MastercardMark({ className = '', style, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className} style={style} aria-label="Mastercard" role="img" {...props}>
      <circle cx="30" cy="30" r="30" fill="currentColor" opacity="0.8" />
      <circle cx="70" cy="30" r="30" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
