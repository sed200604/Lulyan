require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkCustomer() {
  try {
    const pi = await stripe.paymentIntents.retrieve('pi_3TtbDhRwk2EWLML00y1OY3Oy', {
      expand: ['customer', 'payment_method']
    });
    
    console.log('Customer Details:');
    console.log(JSON.stringify(pi.customer, null, 2));
    
    console.log('\nPayment Method Billing Details:');
    if (pi.payment_method) {
      console.log(JSON.stringify(pi.payment_method.billing_details, null, 2));
    }
  } catch(e) {
    console.error('Error:', e.message);
  }
}

checkCustomer();
