'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { TrustBadge } from '@/components/checkout/TrustBadge';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaiementPage() {
  const { items, subtotal, isFreeShipping, promoDiscount } = useCartStore();
  const { contactInfo } = useCheckoutStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  const shippingAmount = items.length > 0 && !isFreeShipping() ? 4.9 : 0;
  const cartAmount = subtotal() - promoDiscount() + shippingAmount;
  const amountToUse = cartAmount > 0 ? cartAmount : 604.93; // Fallback for direct testing

  useEffect(() => {
    // Avoid double fetching in strict mode or empty cart
    if (items.length === 0) return;

    const orderData = {
      items: items.map(item => ({
        id: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAmount,
      customerEmail: contactInfo?.email || 'client@luliyane.paris',
      promoCode: '', // Add promo code from store if needed in the future
      customerDetails: {
        ...contactInfo,
        ...shippingAddress
      }
    };

    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Backend ${res.status}: ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) throw new Error('No clientSecret returned');
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error('[LULIYANE] PaymentIntent creation failed:', err);
        setInitError(err.message);
      });
  }, [items, shippingAmount, contactInfo?.email]);

  if (initError) {
    return (
      <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
        <h1 style={{ fontSize: 20, marginBottom: 16 }}>Erreur d'initialisation</h1>
        <div style={{ background: '#fee', color: '#c00', padding: 16, borderRadius: 8, whiteSpace: 'pre-wrap' }}>
          {initError}
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid #B8956A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: 16, color: '#888' }}>Préparation du paiement sécurisé...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        locale: 'fr',
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#B8956A',
            colorText: '#2A2A2A',
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: '8px',
          },
        },
      }}
    >
      <PaymentForm amount={amountToUse} />
    </Elements>
  );
}

function PaymentForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError('Stripe pas encore chargé.');
      return;
    }
    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Erreur de validation.');
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
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

    if (confirmError) {
      setError(confirmError.message ?? 'Paiement refusé.');
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      window.location.href = `/checkout/confirmation?payment_intent=${paymentIntent.id}`;
    } else {
      setError('Statut inattendu. Contactez le support.');
      setProcessing(false);
    }
  };

  const formattedAmount = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

  const isDisabled = !stripe || !elements || processing;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '40px auto 120px', padding: '0 16px' }}>
      <h1 style={{
        fontSize: 22, fontWeight: 400, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#B8956A', marginBottom: 8,
      }}>MODE DE PAIEMENT</h1>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
        Vos informations sont sécurisées par Stripe · Certifié PCI-DSS
      </p>

      <div style={{ background: '#fff', border: '1px solid #EEE', borderRadius: 12, padding: 20 }}>
        <PaymentElement
          options={{
            layout: 'accordion',
            business: { name: 'LULIYANE PARIS' },
            wallets: { applePay: 'auto', googlePay: 'auto' },
            defaultValues: { billingDetails: { address: { country: 'FR' } } },
            fields: {
              billingDetails: {
                address: { country: 'never', postalCode: 'auto' },
              },
            },
          }}
        />
      </div>

      {error && (
        <div role="alert" style={{
          marginTop: 16, padding: 12, background: '#FDECEC',
          color: '#B91C1C', borderRadius: 8, fontSize: 14,
        }}>{error}</div>
      )}

      <div style={{ height: 180 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#FAF7F2' }}>
        <button
          type="submit"
          disabled={isDisabled}
          style={{
            width: '100%',
            padding: '18px 20px',
            background: isDisabled ? '#888' : '#2A2A2A',
            color: '#fff', border: 'none',
            fontSize: 15, fontWeight: 500,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.6 : 1,
            transition: 'all 200ms ease',
          }}
        >
          {processing ? 'TRAITEMENT EN COURS...' : `PAYER ${formattedAmount}`}
        </button>
        <TrustBadge variant="editorial" className="!py-4 bg-[#FAF7F2]" />
        <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </form>
  );
}
