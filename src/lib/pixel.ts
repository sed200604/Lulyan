// Single source of truth for browser-side tracking (Meta Pixel & TikTok Pixel).
// Every exported function is consent-gated. Do not call fbq() or ttq() directly elsewhere.

const CURRENCY = 'EUR';

interface TikTokPixel {
  page: () => void;
  track: (event: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  grantConsent?: () => void;
  revokeConsent?: () => void;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: TikTokPixel;
    __consentGranted?: boolean;
    _fbConsentGranted?: boolean;
  }
}

function fbq(...args: unknown[]): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    (window.fbq as (...a: unknown[]) => void)(...args);
  }
}

function ttqTrack(eventName: string, data?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track(eventName, data);
  }
}

function ttqPage(): void {
  if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.page === 'function') {
    window.ttq.page();
  }
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return window.__consentGranted === true || window._fbConsentGranted === true;
}

// Called when user accepts marketing cookies.
export function grantConsent(): void {
  if (typeof window === 'undefined') return;
  window.__consentGranted = true;
  window._fbConsentGranted = true;
  fbq('consent', 'grant');
  fbq('track', 'PageView');
  ttqPage();
}

export function trackPageView(): void {
  if (!hasConsent()) return;
  fbq('track', 'PageView');
  ttqPage();
}

export function trackViewContent({ sku, name, category, price }: {
  sku: string; name: string; category: string; price: number;
}): void {
  if (!hasConsent()) return;

  // Meta Pixel
  fbq('track', 'ViewContent', {
    content_ids: [sku],
    content_name: name,
    content_type: 'product',
    content_category: category,
    contents: [{ id: sku, quantity: 1, item_price: Number(price) }],
    value: Number(price),
    currency: CURRENCY,
  });

  // TikTok Pixel
  ttqTrack('ViewContent', {
    content_id: sku,
    content_name: name,
    content_type: 'product',
    content_category: category,
    price: Number(price),
    value: Number(price),
    currency: CURRENCY,
  });
}

export function trackAddToCart({ sku, name, category, price, quantity = 1 }: {
  sku: string; name: string; category: string; price: number; quantity?: number;
}): void {
  if (!hasConsent()) return;
  const value = Number((Number(price) * quantity).toFixed(2));
  const payload = {
    content_ids: [sku],
    content_name: name,
    content_type: 'product',
    content_category: category,
    contents: [{ id: sku, quantity, item_price: Number(price) }],
    value,
    currency: CURRENCY,
    num_items: quantity,
  };
  const eventId = genId();

  // Meta Pixel
  fbq('track', 'AddToCart', payload, { eventID: eventId });
  sendCAPI('AddToCart', payload, eventId);

  // TikTok Pixel
  ttqTrack('AddToCart', {
    content_id: sku,
    content_name: name,
    content_type: 'product',
    content_category: category,
    quantity,
    price: Number(price),
    value,
    currency: CURRENCY,
  });
}

export function trackInitiateCheckout({ totalAmount, items }: {
  totalAmount: number;
  items: Array<{ sku: string; quantity: number; price: number }>;
}): void {
  if (!hasConsent()) return;
  const value = Number(Number(totalAmount).toFixed(2));
  const contents = items.map(it => ({ id: it.sku, quantity: it.quantity, item_price: Number(it.price) }));
  const contentIds = items.map(it => it.sku);

  // Meta Pixel
  fbq('track', 'InitiateCheckout', {
    content_ids: contentIds,
    content_type: 'product',
    contents,
    value,
    currency: CURRENCY,
    num_items: items.reduce((s, it) => s + it.quantity, 0),
  });

  // TikTok Pixel
  ttqTrack('InitiateCheckout', {
    contents: items.map(it => ({
      content_id: it.sku,
      quantity: it.quantity,
      price: Number(it.price),
    })),
    value,
    currency: CURRENCY,
  });
}

export function trackPurchase({ orderId, totalAmount, items }: {
  orderId: string;
  totalAmount: number;
  items: Array<{ sku: string; quantity: number; price: number }>;
}): void {
  if (!hasConsent()) return;

  // Fire exactly once per order — survives page refreshes
  const key = 'px_purchase_' + orderId;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
  } catch { return; }

  const contents = items.map(it => ({ id: it.sku, quantity: it.quantity, item_price: Number(it.price) }));
  const contentIds = items.map(it => it.sku);
  const value = Number(Number(totalAmount).toFixed(2));
  const numItems = items.reduce((s, it) => s + it.quantity, 0);
  const eventId = 'purchase_' + orderId;

  // Meta Pixel
  fbq('track', 'Purchase', {
    content_ids: contentIds,
    content_type: 'product',
    contents,
    value,
    currency: CURRENCY,
    num_items: numItems,
    order_id: orderId,
  }, { eventID: eventId });

  sendCAPI('Purchase', {
    content_ids: contentIds,
    content_type: 'product',
    contents,
    value,
    currency: CURRENCY,
    num_items: numItems,
    order_id: orderId,
  }, eventId);

  // TikTok Pixel (CompletePayment standard event for purchases)
  ttqTrack('CompletePayment', {
    contents: items.map(it => ({
      content_id: it.sku,
      quantity: it.quantity,
      price: Number(it.price),
    })),
    value,
    currency: CURRENCY,
  });
}

// ── internal helpers ─────────────────────────────────────────────────────────

function genId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function sendCAPI(eventName: string, customData: Record<string, unknown>, eventId: string): void {
  if (typeof fetch === 'undefined') return;
  fetch('/api/capi/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
      action_source: 'website',
      user_data: {
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      },
      custom_data: customData,
    }),
  }).catch(() => {});
}
