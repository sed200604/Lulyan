import { VisaMark } from './VisaMark';
import { MastercardMark } from './MastercardMark';
import { AmexMark } from './AmexMark';
import { CBMark } from './CBMark';
import { ApplePayMark } from './ApplePayMark';
import { GooglePayMark } from './GooglePayMark';

export function PaymentIconRow({ size = 20, className = '', iconClassName = 'text-neutral-800' }: { size?: number; className?: string; iconClassName?: string }) {
  const iconStyle = { height: size, width: 'auto' };
  return (
    <div className={`flex items-center gap-3 ${className}`} role="list" aria-label="Moyens de paiement acceptés">
      <VisaMark className={iconClassName} style={iconStyle} />
      <MastercardMark className={iconClassName} style={iconStyle} />
      <AmexMark className={iconClassName} style={iconStyle} />
      <CBMark className={iconClassName} style={iconStyle} />
      <ApplePayMark className={iconClassName} style={iconStyle} />
      <GooglePayMark className={iconClassName} style={iconStyle} />
    </div>
  );
}
