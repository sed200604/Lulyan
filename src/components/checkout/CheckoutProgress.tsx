import { motion } from 'framer-motion';

export type CheckoutStep = 'info' | 'shipping' | 'payment' | 'confirmation';

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const STEPS = [
  { id: 'info', label: 'Informations', index: 0 },
  { id: 'shipping', label: 'Livraison', index: 1 },
  { id: 'payment', label: 'Paiement', index: 2 },
  { id: 'confirmation', label: 'Confirmation', index: 3 },
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-brand-black-100 -translate-y-1/2 z-0" />
        
        {/* Active Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] bg-brand-gold-500 -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <motion.div 
                    className="absolute w-8 h-8 rounded-full bg-brand-gold-500/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <div 
                  className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isCompleted 
                      ? 'bg-brand-gold-500 border-none' 
                      : isActive 
                        ? 'bg-brand-gold-500 border-none'
                        : 'bg-brand-cream-50 border-2 border-brand-black-200'
                  }`}
                >
                  {isCompleted && (
                    <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className={`absolute top-6 font-sans text-[11px] uppercase tracking-[0.1em] whitespace-nowrap transition-colors duration-300 ${
                isActive ? 'text-brand-black-500 font-bold' : 'text-brand-black-300 font-medium'
              } ${!isActive ? 'hidden sm:block' : 'block'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
