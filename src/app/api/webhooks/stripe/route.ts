import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' as any });
  const resend = new Resend(process.env.RESEND_API_KEY?.trim());
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('[webhook] signature error', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'payment_intent.succeeded') {
    return NextResponse.json({ received: true });
  }

  const pi = event.data.object as Stripe.PaymentIntent;
  const metadata = pi.metadata || {};

  // Update Supabase order status
  try {
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('stripe_payment_intent', pi.id);
      
    if (updateError) {
      console.error('[webhook] supabase update error:', updateError);
    }
  } catch (dbErr) {
    console.error('[webhook] supabase try-catch error:', dbErr);
  }

  const customerEmail = metadata.customerEmail;
  if (!customerEmail || customerEmail === 'unknown') {
    console.warn('[webhook] no customerEmail in metadata', pi.id);
    return NextResponse.json({ error: 'No customer email in metadata' }, { status: 400 });
  }

  // Generate a random order number for the email since we don't have Supabase ID
  const orderNumber = `CMD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  // Estimate delivery: today + 3 business days
  const deliveryFrom = new Date();
  deliveryFrom.setDate(deliveryFrom.getDate() + 3);
  const deliveryTo = new Date();
  deliveryTo.setDate(deliveryTo.getDate() + 5);

  let items = [];
  let giftItems = [];
  try {
    if (metadata.itemsSummary) {
      items = JSON.parse(metadata.itemsSummary);
    }
    if (metadata.gift_items) {
      giftItems = JSON.parse(metadata.gift_items);
    }
  } catch (e) {
    console.error('Failed to parse items from metadata');
  }

  // Send confirmation email
  const { data: sent, error: emailErr } = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'bonjour@luliyan-paris.com',
    to: customerEmail,
    replyTo: process.env.EMAIL_REPLY_TO || 'contact@luliyan-paris.com',
    subject: `Commande #${orderNumber} confirmée · LULIYANE PARIS`,
    react: OrderConfirmationEmail({
      orderNumber: orderNumber,
      customerName: metadata.customerName || 'Client(e)',
      items: items.map((it: any) => ({
        name: it.n,
        variant: 'Standard',
        quantity: it.q,
        unitPrice: Number(it.p),
        lineTotal: Number(it.p) * Number(it.q),
        imageUrl: it.i || '',
      })),
      giftItems: giftItems,
      subtotal: Number(metadata.subtotal || 0),
      shippingCost: Number(metadata.shipping || 0),
      discountAmount: Number(metadata.discount || 0),
      totalAmount: pi.amount / 100,
      shippingAddress: {
        line1: metadata.addressLine1 || '',
        line2: metadata.addressLine2 || '',
        postalCode: metadata.postalCode || '',
        city: metadata.city || '',
        country: metadata.country || '',
      },
      deliveryFrom: deliveryFrom.toISOString(),
      deliveryTo: deliveryTo.toISOString(),
    }),
  });

  if (emailErr) {
    console.error('[webhook] email send failed', emailErr);
    return NextResponse.json({ error: emailErr.message }, { status: 500 });
  }

  return NextResponse.json({ received: true, sent: true });
}
