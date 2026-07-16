'use client';

import { useState, useEffect } from 'react';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';

import { OrderSummary } from '@/components/checkout/OrderSummary';
import { ExpressPaymentRow } from '@/components/checkout/ExpressPaymentRow';
import { DeliveryForm } from '@/components/checkout/DeliveryForm';
import { StripePaymentForm } from '@/components/checkout/StripePaymentForm';
import { TrustBar } from '@/components/checkout/TrustBar';
import { PayButton } from '@/components/checkout/PayButton';
import { HelpFooter } from '@/components/checkout/HelpFooter';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmStripePayment = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmation`,
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

  const handlePay = () => {
    confirmStripePayment();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
      
      {/* MOBILE: Order Summary (Accordion) */}
      <div className="lg:hidden w-full -mx-5 px-5 sm:-mx-8 sm:px-8 border-b border-[#EEE]">
        <OrderSummary variant="mobile" />
      </div>

      {/* LEFT COLUMN: Checkout Flow */}
      <div className="flex-1 w-full max-w-[600px] lg:max-w-none mx-auto lg:mx-0 pt-4 lg:pt-0">
        <form 
          id="payment-form" 
          className="flex flex-col gap-10"
          onSubmit={(e) => { e.preventDefault(); confirmStripePayment(); }}
        >
          <ExpressPaymentRow onConfirm={() => confirmStripePayment()} />
          
          <DeliveryForm />
          
          <StripePaymentForm />

          {error && (
            <div className="text-[13px] text-red-700 bg-red-50 p-3 rounded-[4px] mt-[-20px]">
              {error}
            </div>
          )}
          
          <div className="mt-8">
            <TrustBar />
          </div>

          <div className="lg:hidden">
            <PayButton isProcessing={isProcessing} isDisabled={!stripe || !elements} onClick={handlePay} />
          </div>
          
          <div className="hidden lg:block">
            <PayButton isProcessing={isProcessing} isDisabled={!stripe || !elements} onClick={handlePay} />
          </div>

          <HelpFooter />
        </form>
      </div>

      {/* RIGHT COLUMN: Order Summary (Desktop Sticky) */}
      <div className="hidden lg:block w-[400px] shrink-0 border-l border-[#EEE] pl-16">
        <div className="sticky top-8">
          <OrderSummary variant="desktop" />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { items, isFreeShipping, promoCode } = useCartStore();
  const { deliveryMethod, contactInfo, shippingAddress } = useCheckoutStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync cart and customer data for abandoned carts / lead capture
  useEffect(() => {
    if (!isHydrated || items.length === 0) return;
    if (!contactInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) return;

    const timeoutId = setTimeout(() => {
      const shippingAmount = isFreeShipping() ? 0 : (deliveryMethod === 'express' ? 9.90 : 4.90);
      
      fetch('/api/checkout/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAmount,
          customerEmail: contactInfo.email,
          customerDetails: {
            ...contactInfo,
            ...shippingAddress
          }
        })
      }).catch(err => console.error('Failed to sync checkout:', err));
    }, 2000); // 2-second debounce

    return () => clearTimeout(timeoutId);
  }, [contactInfo, shippingAddress, items, deliveryMethod, isFreeShipping, isHydrated]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const shippingAmount = isFreeShipping() ? 0 : (deliveryMethod === 'express' ? 9.90 : 4.90);
        
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items, 
            shippingAmount, 
            promoCode,
            customerEmail: useCheckoutStore.getState().contactInfo?.email,
            customerDetails: {
              ...useCheckoutStore.getState().contactInfo,
              ...useCheckoutStore.getState().shippingAddress
            }
          }),
        });
        const data = await res.json();
        if (res.ok && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setFetchError(data.error || "Erreur lors de l'initialisation du paiement");
        }
      } catch (err: any) {
        console.error('Error fetching client secret:', err);
        setFetchError(err.message || 'Erreur réseau. Veuillez réessayer.');
      }
    };
    
    // Only fetch if hydrated and there are items
    if (isHydrated && items.length > 0) {
      fetchClientSecret();
    }
  }, [items, isFreeShipping, promoCode, deliveryMethod, isHydrated]);

  // Wait for store to hydrate
  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="text-xl font-medium">Votre panier est vide</h2>
        <a href="/" className="bg-black text-white px-6 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors uppercase">
          Continuer vos achats
        </a>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4 text-center px-4">
        <p className="text-red-600 font-medium">{fetchError}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-black text-white px-6 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors uppercase mt-4"
        >
          Réessayer
        </button>
      </div>
    );
  }

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
      <CheckoutForm />
    </Elements>
  );
}
