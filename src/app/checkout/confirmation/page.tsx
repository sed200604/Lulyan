'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { trackPurchase, grantConsent, hasConsent } from '@/lib/pixel';
import { supabase } from '@/lib/supabase';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const { items, subtotal, isFreeShipping, clearCart } = useCartStore();
  const firedRef = useRef(false);

  useEffect(() => {
    // Strict-mode safe: only fire once
    if (firedRef.current) return;
    firedRef.current = true;

    // Stable orderId from Stripe (survives refresh — idempotency key won't collide across orders)
    const orderId = paymentIntentId ?? 'LYP-' + Date.now();

    // Snapshot cart BEFORE clearing — Zustand persists in localStorage across the Stripe redirect
    const orderItems = items.map(item => ({
      sku: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    const shippingAmount = items.length > 0 && !isFreeShipping() ? 4.9 : 0;
    const total = Number((subtotal() + shippingAmount).toFixed(2));

    // Clear cart immediately — safe to call on refresh (items already empty then)
    clearCart();

    if (orderItems.length === 0) {
      // Cart already cleared (page refresh or direct navigation) — skip, idempotency key blocks any prior fire
      console.log('[PURCHASE_DIAG] Skipping — cart already empty (likely a page refresh)');
      return;
    }

    console.log('[PURCHASE_DIAG] Firing with:', { orderId, totalAmount: total, itemCount: orderItems.length, items: orderItems });

    // Wait 100ms so MetaPixelTracker's setTimeout(0) consent restoration has run.
    // Then read localStorage directly as a fallback — more reliable than waiting for the
    // cmp:consent:granted DOM event (which only fires on first-time acceptance, not on redirect returns).
    const timer = setTimeout(() => {
      if (!hasConsent()) {
        try {
          const stored = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
          if (stored.marketing) {
            grantConsent();
          }
        } catch { /* ignore */ }
      }

      if (hasConsent()) {
        trackPurchase({ orderId, totalAmount: total, items: orderItems });
      } else {
        console.log('[PURCHASE_DIAG] Consent not granted — Purchase skipped');
      }

      // Mark order as paid in Supabase
      if (paymentIntentId) {
        supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('stripe_payment_intent', paymentIntentId)
          .then(({ error }) => {
            if (error) {
              console.error('Error updating order to paid in Supabase:', error);
            } else {
              console.log('Order marked as paid in Supabase.');
            }
          });
      }
    }, 100);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 540, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
      <h1 style={{
        fontFamily: 'var(--font-cormorant, Georgia, serif)',
        fontWeight: 300,
        fontSize: 30,
        letterSpacing: '0.05em',
        color: '#2A2A2A',
        marginBottom: 12,
      }}>
        Merci pour votre commande
      </h1>
      <p style={{ color: '#666', fontSize: 15, lineHeight: 1.6, maxWidth: 380, margin: '0 auto' }}>
        Votre paiement a été confirmé. Un e-mail de confirmation vous sera envoyé dans les prochaines minutes.
      </p>
      {paymentIntentId && (
        <p style={{ fontSize: 12, color: '#bbb', marginTop: 28, letterSpacing: '0.03em' }}>
          Réf · {paymentIntentId}
        </p>
      )}
      <div style={{ marginTop: 40 }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: '#2A2A2A',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 13,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Retour à la boutique
        </a>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: 80, color: '#666' }}>
        Chargement de votre confirmation...
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
