import { NextResponse } from 'next/server';

const PIXEL_ID = '1532819011643081';
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

export async function POST(req: Request) {
  try {
    if (!CAPI_TOKEN) {
      console.warn('META_CAPI_TOKEN is missing. CAPI event not sent.');
      return NextResponse.json({ success: false, error: 'Missing token' }, { status: 500 });
    }

    const body = await req.json();

    // Attach server-side data
    const user_data = body.user_data || {};
    user_data.client_user_agent = user_data.client_user_agent || req.headers.get('user-agent');
    user_data.client_ip_address = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip');

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          event_source_url: body.event_source_url,
          action_source: body.action_source,
          user_data: user_data,
          custom_data: body.custom_data,
        }
      ],
    };
    if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

    const response = await fetch(`https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('CAPI Error:', result);
      return NextResponse.json({ success: false, error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('CAPI Server Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
