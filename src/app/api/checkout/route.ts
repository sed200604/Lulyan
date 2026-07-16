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

    const subtotalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    let discountAmount = 0;
    const code = promoCode?.toUpperCase()?.trim();
    if (code === 'BIENVENUE') discountAmount = subtotalAmount * 0.10;
    if (code === 'PM10') discountAmount = subtotalAmount * 0.20;
    
    const totalAmount = subtotalAmount - discountAmount;
    const amountInCents = Math.round((totalAmount + shippingAmount) * 100);

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
        itemsSummary: JSON.stringify(items.map((i: any) => ({ n: i.name || i.id, q: i.quantity, p: i.price, i: i.image || i.imageUrl }))).substring(0, 500),
        subtotal: subtotalAmount.toString(),
        shipping: shippingAmount.toString(),
        discount: discountAmount.toString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Bypass Supabase: we skip saving the order and order items to the database
    // The webhook will now read from metadata directly.
    /*
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
        product_id: item.id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price
      }));

      await supabase.from('order_items').insert(orderItemsToInsert);
    }
    */

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
