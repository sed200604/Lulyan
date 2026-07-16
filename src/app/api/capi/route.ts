import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PIXEL_ID, CAPIEventParams } from '@/lib/meta-capi';

// Get token from env
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;

function hashData(data?: string): string | undefined {
  if (!data) return undefined;
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(req: Request) {
  try {
    const body: CAPIEventParams = await req.json();

    if (!CAPI_TOKEN) {
      console.warn('META_CAPI_TOKEN is missing. CAPI event not sent.');
      return NextResponse.json({ success: false, error: 'Missing token' }, { status: 500 });
    }

    // Parse cookies from request for browser signal matching
    const cookieHeader = req.headers.get('cookie') || '';
    const parseCookie = (name: string) => {
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
      return match ? decodeURIComponent(match[1]) : undefined;
    };

    // Build user_data with hashed PII
    const userData: any = {
      client_user_agent: req.headers.get('user-agent'),
      client_ip_address: req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip'),
      fbp: parseCookie('_fbp'),
      fbc: parseCookie('_fbc'),
    };

    if (body.user_data) {
      if (body.user_data.email) userData.em = hashData(body.user_data.email);
      if (body.user_data.phone) userData.ph = hashData(body.user_data.phone?.replace(/[\s+]/g, ''));
      if (body.user_data.first_name) userData.fn = hashData(body.user_data.first_name);
      if (body.user_data.last_name) userData.ln = hashData(body.user_data.last_name);
      if (body.user_data.external_id) userData.external_id = hashData(body.user_data.external_id);
    }

    // Build custom_data
    const customData: any = {};
    if (body.value !== undefined) customData.value = body.value;
    if (body.currency) customData.currency = body.currency;
    if (body.content_name) customData.content_name = body.content_name;
    if (body.content_type) customData.content_type = body.content_type;
    if (body.content_category) customData.content_category = body.content_category;
    if (body.content_ids) customData.content_ids = body.content_ids;
    if (body.num_items !== undefined) customData.num_items = body.num_items;
    if (body.search_string) customData.search_string = body.search_string;

    const payload = {
      data: [
        {
          event_name: body.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.event_id,
          event_source_url: body.event_source_url,
          action_source: 'website',
          user_data: userData,
          custom_data: customData,
        },
      ],
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
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
