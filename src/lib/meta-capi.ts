export const PIXEL_ID = '1532819011643081';

export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2);
}

export interface CAPIEventParams {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  num_items?: number;
  search_string?: string;
  user_data?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    external_id?: string;
  };
}

export async function sendCAPIEvent(params: CAPIEventParams) {
  try {
    const response = await fetch('/api/capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        event_source_url: params.event_source_url || (typeof window !== 'undefined' ? window.location.href : undefined),
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to send CAPI event', await response.text());
    }
  } catch (error) {
    console.error('Error sending CAPI event', error);
  }
}

export function fireMetaPixelEvent(eventName: string, data: any = {}, eventId?: string) {
  if (typeof window !== 'undefined' && (window as any)._fbConsentGranted && typeof (window as any).fbq === 'function') {
    if (eventId) {
      (window as any).fbq('track', eventName, data, { eventID: eventId });
    } else {
      (window as any).fbq('track', eventName, data);
    }
  }
}

export function fireTikTokPixelEvent(eventName: string, data: any = {}) {
  if (typeof window !== 'undefined' && (window as any).ttq && typeof (window as any).ttq.track === 'function') {
    // Map Meta event names to TikTok standard event names if needed
    let ttEvent = eventName;
    if (eventName === 'Purchase') ttEvent = 'CompletePayment';

    (window as any).ttq.track(ttEvent, data);
  }
}

// Unified function to fire both Client and Server side
export function trackEvent(eventName: string, data: Partial<CAPIEventParams> = {}, customUserData?: any, forcedEventId?: string) {
  if (typeof window === 'undefined' || !(window as any)._fbConsentGranted) return;
  
  const eventId = forcedEventId || generateEventId();
  
  // Clean up data for client side pixel
  const clientData: any = {
    ...data,
  };
  
  delete clientData.event_name;
  delete clientData.event_id;
  delete clientData.user_data;
  delete clientData.event_source_url;
  
  fireMetaPixelEvent(eventName, clientData, eventId);
  fireTikTokPixelEvent(eventName, clientData);
  
  sendCAPIEvent({
    event_name: eventName,
    event_id: eventId,
    user_data: customUserData,
    ...data
  });
}
