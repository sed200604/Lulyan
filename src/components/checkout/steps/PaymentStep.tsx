import { useState, useEffect } from 'react';
import { Elements, useStripe, useElements, PaymentElement, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/stores/cartStore';
import { DeliveryRecap } from '../DeliveryRecap';
import { TrustBar } from '../TrustBar';
import { PayButton } from '../PayButton';

// Initialize Stripe (use NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in production)
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface PaymentStepProps {
  onBack: () => void;
}

function PaymentForm({ onBack }: { onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpressAvailable, setIsExpressAvailable] = useState<boolean>(true);

  const confirmStripePayment = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmation`,
          payment_method_data: {
            billing_details: {
              address: {
                country: 'FR'
              }
            }
          }
        },
        redirect: 'if_required',
      });

      if (error) {
        setError(error.message ?? 'Paiement refusé. Veuillez vérifier vos informations.');
        setIsProcessing(false);
      } else if (paymentIntent?.status === 'succeeded') {
        window.location.href = '/checkout/confirmation?payment_intent=' + paymentIntent.id;
      } else if (paymentIntent?.status === 'processing') {
        window.location.href = '/checkout/confirmation?payment_intent=' + paymentIntent.id + '&status=processing';
      } else if (paymentIntent?.status === 'requires_action') {
        setError('Authentification 3D Secure requise. Veuillez réessayer.');
        setIsProcessing(false);
      } else {
        setError('Statut inattendu. Contactez le support.');
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error('[Stripe] confirmPayment threw:', err);
      setError(err?.message ?? 'Une erreur est survenue. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmStripePayment();
  };

  const handleExpressConfirm = () => {
    confirmStripePayment();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pb-24 lg:pb-0">
      <div className="flex flex-col gap-6">
        <div className="hidden lg:block mb-2">
          <h2 className="font-cormorant text-[24px] text-brand-black-500 uppercase tracking-widest">
            Paiement
          </h2>
          <div className="w-full h-[1px] bg-brand-black-100/50 mt-4" />
        </div>
        
        {/* Express Checkout (Apple Pay / Google Pay) */}
        <div className={`bg-white border border-[#EEE] rounded-[12px] p-6 ${!isExpressAvailable ? 'hidden' : ''}`}>
          <div className="mb-4">
            <h3 className="font-cormorant text-[15px] tracking-[0.05em] uppercase text-brand-black-500 mb-1">
              Paiement Express
            </h3>
            <p className="font-sans text-[11px] text-[#888]">
              Paiement rapide et sécurisé avec Apple Pay ou Google Pay
            </p>
          </div>
          <ExpressCheckoutElement 
            onReady={({availablePaymentMethods}) => {
              // availablePaymentMethods contains objects like { applePay: boolean, googlePay: boolean, link: boolean }
              // But actually availablePaymentMethods is an array of strings in some versions, or an object.
              // In @stripe/react-stripe-js 6.x, onReady receives an event with `availablePaymentMethods` which is an object.
              const methods = availablePaymentMethods as any;
              const hasAppleOrGoogle = methods?.applePay || methods?.googlePay;
              
              if (!hasAppleOrGoogle) {
                setIsExpressAvailable(false);
              }
            }}
            options={{
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              }
            }}
            onConfirm={handleExpressConfirm} 
          />
        </div>
        

        {/* Stripe Payment Element Section */}
        <div className="bg-white border border-[#EEE] rounded-[12px] p-6">
          <div className="mb-6">
            <h3 className="font-cormorant text-[15px] tracking-[0.05em] uppercase text-brand-black-500 mb-1">
              Mode de paiement
            </h3>
            <p className="font-sans text-[11px] text-[#888]">
              Vos informations sont sécurisées par Stripe · Certifié PCI-DSS
            </p>
          </div>
          
          <PaymentElement 
            options={{
              layout: 'accordion',
              business: { name: 'LULIYANE PARIS' },
              wallets: { applePay: 'never', googlePay: 'never' },
              fields: {
                billingDetails: {
                  name: 'auto',
                  email: 'auto',
                  phone: 'auto',
                  address: {
                    country: 'never',   // hide country selector — we know it's France
                    postalCode: 'auto',
                  },
                },
              },
              defaultValues: {
                billingDetails: {
                  address: {
                    country: 'FR',       // force France
                  },
                },
              },
            }} 
          />
          
          {error && (
            <div className="mt-4 text-[13px] text-red-700 bg-red-50 p-3 rounded-[4px]">
              {error}
            </div>
          )}
        </div>

        <DeliveryRecap />
        <TrustBar />
      </div>

      {/* Safety Net Links */}
      <div className="flex flex-col gap-6 mt-8">
        <button 
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="self-start font-sans text-[13px] text-brand-gold-500 hover:text-brand-gold-600 transition-colors disabled:opacity-50"
        >
          ← Retour à la livraison
        </button>

        <div className="flex flex-col gap-1 font-sans text-[12px] text-brand-black-400">
          <div className="flex items-center gap-2">
            <span>Besoin d'aide ?</span>
            <a href="https://wa.me/33766676429" target="_blank" rel="noopener noreferrer" className="text-brand-black-500 hover:text-brand-gold-500 flex items-center gap-1 transition-colors">
              💬 Chat
            </a>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-1">
              📞 +33 7 66 67 64 29
            </span>
          </div>
          <span className="text-brand-black-300">Lun-Ven 9h-18h</span>
        </div>

        <p className="font-sans text-[11px] text-brand-black-300 leading-relaxed max-w-md">
          En finalisant votre commande, vous acceptez nos{' '}
          <a href="#" className="underline text-brand-gold-500 hover:text-brand-gold-600 transition-colors">Conditions de vente</a>
          {' '}et notre{' '}
          <a href="#" className="underline text-brand-gold-500 hover:text-brand-gold-600 transition-colors">Politique de confidentialité</a>.
        </p>
      </div>

      <PayButton isProcessing={isProcessing} isDisabled={!stripe || !elements} />
    </form>
  );
}

export function PaymentStep({ onBack }: PaymentStepProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const { items, isFreeShipping, promoCode } = useCartStore();

  useEffect(() => {
    // Fetch the PaymentIntent client secret
    const fetchClientSecret = async () => {
      try {
        const shippingAmount = isFreeShipping() ? 0 : 4.90;
        const customerStr = localStorage.getItem('luliyane_customer');
        const customerData = customerStr ? JSON.parse(customerStr) : null;
        
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, shippingAmount, customerEmail: customerData?.email, promoCode }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        console.error('Error fetching client secret:', err);
      }
    };
    
    if (items.length > 0) {
      fetchClientSecret();
    }
  }, [items, isFreeShipping, promoCode]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-6 h-6 border-2 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#B8956A',
      colorBackground: '#FFFFFF',
      colorText: '#2A2A2A',
      colorDanger: '#B91C1C',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        border: '1px solid #E5E5E5',
        padding: '12px 14px',
        fontSize: '15px',
      },
      '.Input:focus': {
        border: '1px solid #B8956A',
        boxShadow: '0 0 0 2px rgba(184, 149, 106, 0.15)',
      },
      '.Label': {
        fontSize: '12px',
        color: '#555',
        letterSpacing: '0.05em',
        marginBottom: '6px',
      },
      '.Tab': {
        border: '1px solid #E5E5E5',
      },
      '.Tab--selected': {
        borderColor: '#B8956A',
        backgroundColor: '#F9F5EC',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance, locale: 'fr' }}>
      <PaymentForm onBack={onBack} />
    </Elements>
  );
}
