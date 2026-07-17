import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia' as any,
});

export async function POST(req: Request) {
  try {
    const { items, shippingAmount, customerEmail, promoCode, customerDetails } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    const chargeableItems = items.filter((item: any) => !item.isGift);
    const subtotalAmount = chargeableItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    // Sanity check: Ensure the subtotal matches what's expected (excluding gifts)
    const allItemsExpectedSubtotal = items.reduce((sum: number, item: any) => {
      if (item.isGift) return sum;
      return sum + (item.price * item.quantity);
    }, 0);
    if (subtotalAmount !== allItemsExpectedSubtotal) {
      console.warn('[Stripe Checkout] Sanity check failed: subtotal mismatch with chargeable items.');
    }

    let discountAmount = 0;
    const code = promoCode?.toUpperCase()?.trim();
    if (code === 'BIENVENUE') discountAmount = subtotalAmount * 0.10;
    if (code === 'PM10') discountAmount = subtotalAmount * 0.20;
    
    const totalAmount = subtotalAmount - discountAmount;
    const amountInCents = Math.round((totalAmount + shippingAmount) * 100);

    const giftItems = items.filter((item: any) => item.isGift);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      receipt_email: customerEmail || undefined,
      metadata: {
        customerEmail: customerEmail || 'unknown',
        customerName: customerDetails?.firstName ? `${customerDetails.firstName} ${customerDetails.lastName}` : '',
        addressLine1: customerDetails?.address1 || '',
        addressLine2: customerDetails?.address2 || '',
        city: customerDetails?.city || '',
        postalCode: customerDetails?.zipCode || '',
        country: customerDetails?.country || '',
        // Strip large data from items to fit metadata limit (500 chars)
        itemsSummary: JSON.stringify(items.filter((i: any) => !i.isGift).map((i: any) => ({ n: i.name, q: i.quantity, p: i.price, i: i.image || i.imageUrl, s: i.size, c: i.color }))).substring(0, 500),
        gift_items: JSON.stringify(giftItems.map((i: any) => ({ 
          sku: i.slug || i.id, 
          color: i.color, 
          linked_to_burkini_sku: i.linkedToItemId 
        }))).substring(0, 500),
        subtotal: subtotalAmount.toString(),
        shipping: shippingAmount.toString(),
        discount: discountAmount.toString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Save the order to Supabase without blocking the checkout flow
    try {
      let customerId = null;
      if (customerEmail) {
        // Find customer
        const { data: customer } = await supabase
          .from('customers')
          .select('id')
          .eq('email', customerEmail)
          .single();
          
        if (customer) {
          customerId = customer.id;
        } else if (customerDetails) {
          // Create new customer
          const { data: newCustomer, error: insertError } = await supabase
            .from('customers')
            .insert({
              email: customerEmail,
              first_name: customerDetails.firstName || '',
              last_name: customerDetails.lastName || '',
              phone: customerDetails.phone || null,
              address: customerDetails.address1 || '',
              address2: customerDetails.address2 || '',
              city: customerDetails.city || '',
              zip_code: customerDetails.zipCode || '',
              country: customerDetails.country || ''
            })
            .select('id')
            .single();
            
          if (newCustomer) {
            customerId = newCustomer.id;
          } else {
            console.error('Failed to insert customer:', insertError);
          }
        }
      }

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerId,
          status: 'pending',
          total_amount: totalAmount + shippingAmount,
          stripe_payment_intent: paymentIntent.id
        })
        .select('id')
        .single();

      if (!orderError && order) {
        // Insert order items
        const orderItemsToInsert = items.map((item: any) => ({
          order_id: order.id,
          product_id: item.productId || item.slug || item.id,
          size: item.size || null,
          color: item.color || null,
          quantity: item.quantity,
          price: item.price
        }));

        await supabase.from('order_items').insert(orderItemsToInsert);
      } else {
        console.error('Failed to insert order:', orderError);
      }
    } catch (dbErr) {
      console.error('Database error during checkout:', dbErr);
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
