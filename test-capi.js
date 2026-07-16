async function testCAPI() {
  console.log('Sending mock AddToCart to CAPI endpoint...');
  
  try {
    const res = await fetch('http://localhost:3000/api/capi/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_name: 'AddToCart',
        event_id: 'test_evt_123',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'http://localhost:3000/products/test',
        action_source: 'website',
        custom_data: {
          content_ids: ['test-sku'],
          content_name: 'Test Product',
          content_type: 'product',
          value: 100,
          currency: 'EUR',
          num_items: 1
        }
      })
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

testCAPI();
