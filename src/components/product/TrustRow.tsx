import { Truck, RefreshCcw, Lock } from 'lucide-react';
import { RETURN_POLICY_LINE } from '@/lib/config/policies';

export function TrustRow() {
  return (
    <div className="flex flex-col gap-4 my-8">
      <div className="flex items-center gap-3">
        <Truck className="w-4 h-4 text-[#C5A14E]" strokeWidth={2} />
        <span className="font-sans text-[12px] font-light text-[#1A1A1A]">
          Livraison Express 24-48h
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <RefreshCcw className="w-4 h-4 text-[#C5A14E]" strokeWidth={2} />
        <span className="font-sans text-[12px] font-light text-[#1A1A1A]">
          {RETURN_POLICY_LINE}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <Lock className="w-4 h-4 text-[#C5A14E]" strokeWidth={2} />
        <span className="font-sans text-[12px] font-light text-[#1A1A1A]">
          Paiement sécurisé par Stripe
        </span>
      </div>
    </div>
  );
}
