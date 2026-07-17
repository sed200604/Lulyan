import { useState } from 'react';
import { Truck, Zap, Store } from 'lucide-react';
import { formatEUR } from '@/lib/utils';

export type ShippingMethod = 'standard' | 'express' | 'relais';

interface ShippingStepProps {
  onNext: (method: ShippingMethod) => void;
  onBack: () => void;
  isFreeShipping: boolean;
}

const METHODS = [
  {
    id: 'standard',
    name: 'Standard (3-5 jours)',
    price: 4.90,
    icon: Truck,
  },
  {
    id: 'express',
    name: 'Express (1-2 jours)',
    price: 9.90,
    icon: Zap,
  },
  {
    id: 'relais',
    name: 'Point Relais (3-5 jours)',
    price: 3.90,
    icon: Store,
  }
];

export function ShippingStep({ onNext, onBack, isFreeShipping }: ShippingStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod>('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(selectedMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="font-cormorant text-2xl text-brand-black-500 uppercase tracking-widest mb-2">
        Mode de Livraison
      </h2>

      <div className="flex flex-col gap-4">
        {METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const displayPrice = method.id === 'standard' && isFreeShipping 
            ? 'Gratuit' 
            : formatEUR(method.price);

          return (
            <div key={method.id}>
              <input
                type="radio"
                id={`shipping-${method.id}`}
                name="shippingMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => setSelectedMethod(method.id as ShippingMethod)}
                className="sr-only"
              />
              <label 
                htmlFor={`shipping-${method.id}`}
                className={`flex items-center p-4 border cursor-pointer transition-all ${
                isSelected ? 'border-brand-gold-500 bg-brand-gold-500/5' : 'border-brand-black-200 hover:border-brand-black-300'
              }`}
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full border mr-4 shrink-0 transition-colors">
                {isSelected ? (
                  <div className="w-3 h-3 rounded-full bg-brand-gold-500" />
                ) : (
                  <div className="w-full h-full rounded-full border-brand-black-200" />
                )}
              </div>
              <div className="flex items-center gap-3 flex-grow">
                <method.icon className={`w-5 h-5 ${isSelected ? 'text-brand-gold-500' : 'text-brand-black-400'}`} />
                <span className={`font-montserrat text-sm ${isSelected ? 'font-semibold text-brand-black-500' : 'text-brand-black-400'}`}>
                  {method.name}
                </span>
              </div>
              <span className="font-montserrat font-bold text-sm text-brand-black-500">
                {displayPrice}
              </span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 gap-4">
        <button 
          type="button"
          onClick={onBack}
          className="font-montserrat text-sm text-brand-black-400 hover:text-brand-gold-500 transition-colors"
        >
          ← Retour aux informations
        </button>
        <button 
          type="submit"
          className="w-full sm:w-auto px-8 h-12 bg-brand-gold-500 text-brand-black-500 font-montserrat font-bold text-sm tracking-wider hover:bg-brand-gold-400 transition-colors"
        >
          CONTINUER VERS LE PAIEMENT →
        </button>
      </div>
    </form>
  );
}
