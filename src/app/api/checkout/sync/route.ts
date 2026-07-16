import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { items, shippingAmount, customerEmail, customerDetails } = await req.json();

    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: 'E-mail invalide' }, { status: 400 });
    }

    const subtotalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    // Upsert customer (if email exists, update the details)
    const { data: customer, error: insertError } = await supabase
      .from('customers')
      .upsert({
        email: customerEmail,
        first_name: customerDetails?.firstName || '',
        last_name: customerDetails?.lastName || '',
        phone: customerDetails?.phone || null,
        address: customerDetails?.address1 || '',
        address2: customerDetails?.address2 || '',
        city: customerDetails?.city || '',
        zip_code: customerDetails?.zipCode || '',
        country: customerDetails?.country || ''
      }, { onConflict: 'email' })
      .select('id')
      .single();

    if (insertError) {
      console.error('[checkout/sync] Failed to upsert customer:', insertError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Since we don't have a unique identifier per session, 
    // creating an order on every debounce can spam the orders table.
    // Instead, we just upsert the customer for lead capture.
    // We can also insert an abandoned order IF there's no pending/abandoned order today,
    // but the easiest robust way is just capturing the customer contact details.

    // Let's check if they have a recent abandoned order
    const { data: recentOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('customer_id', customer.id)
      .eq('status', 'abandoned')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let orderId = recentOrder?.id;

    if (!orderId) {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customer.id,
          status: 'abandoned',
          total_amount: subtotalAmount + (shippingAmount || 0),
          stripe_payment_intent: null
        })
        .select('id')
        .single();
        
      if (!orderError && order) {
        orderId = order.id;
        
        if (items && items.length > 0) {
          const orderItemsToInsert = items.map((item: any) => ({
            order_id: orderId,
            product_id: item.id || item.productId,
            size: item.size || null,
            color: item.color || null,
            quantity: item.quantity,
            price: item.price
          }));
          await supabase.from('order_items').insert(orderItemsToInsert);
        }
      }
    }

    return NextResponse.json({ success: true, customerId: customer.id });
  } catch (error: any) {
    console.error('[checkout/sync] Error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
