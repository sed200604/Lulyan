'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'luliyane_popup_dismissed_until';
const REAPPEAR_DAYS = 7;
const BLOCKED_ROUTES = ['/checkout', '/account', '/cart'];

export function WelcomePopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Never show on blocked routes
    if (BLOCKED_ROUTES.some(r => pathname.startsWith(r))) return;

    // Never show if dismissed within last 7 days
    const dismissedUntil = localStorage.getItem(STORAGE_KEY);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) return;

    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      setIsOpen(true);
    };

    // Trigger 1: 15 seconds delay
    const timer = setTimeout(open, 15000);

    // Trigger 2: exit intent (desktop only)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth >= 768) open();
    };
    document.addEventListener('mouseleave', onMouseLeave);

    // Trigger 3: mobile scroll depth 60%
    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (depth >= 0.6 && window.innerWidth < 768) open();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function dismiss() {
    setIsOpen(false);
    const until = Date.now() + REAPPEAR_DAYS * 24 * 3600 * 1000;
    localStorage.setItem(STORAGE_KEY, String(until));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consented) {
      setMessage('Veuillez accepter de recevoir la newsletter.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'welcome_popup' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setStatus('success');
      setMessage('Merci ! Votre code arrive par e-mail dans quelques secondes.');
      setTimeout(dismiss, 3000);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Une erreur est survenue.');
    }
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(42,42,42,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'fadeIn 200ms ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16,
          maxWidth: 440, width: '100%',
          padding: 40,
          position: 'relative',
          animation: 'popupEnter 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close × */}
        <button
          onClick={dismiss}
          aria-label="Fermer"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32,
            background: 'transparent', border: 'none',
            fontSize: 20, cursor: 'pointer', color: '#888',
          }}
        >×</button>

        {/* Micro-label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ height: 1, width: 24, background: 'rgba(184,149,106,0.4)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#B8956A', textTransform: 'uppercase' }}>
            Le Cercle
          </span>
          <div style={{ height: 1, width: 24, background: 'rgba(184,149,106,0.4)' }} />
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 300,
          fontSize: 34,
          lineHeight: 1.15,
          textAlign: 'center',
          color: '#2A2A2A',
          margin: '0 0 12px',
        }}>
          −10% sur votre<br />première commande
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic', fontSize: 15,
          color: '#666', textAlign: 'center',
          marginBottom: 24,
        }}>
          Rejoignez le cercle Luliyane et recevez votre code exclusif.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="votre@email.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            style={{
              width: '100%', padding: '14px 16px',
              border: '1px solid #DDD', borderRadius: 8,
              fontSize: 16, marginBottom: 12,
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            style={{
              width: '100%', padding: 16,
              background: status === 'success' ? '#166534' : '#2A2A2A',
              color: '#fff', border: 'none', borderRadius: 8,
              fontSize: 14, letterSpacing: '0.15em',
              textTransform: 'uppercase', fontWeight: 500,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.6 : 1,
              transition: 'all 200ms ease',
            }}
          >
            {status === 'loading' ? 'ENVOI...' : status === 'success' ? '✓ ENVOYÉ' : 'RECEVOIR MON CODE →'}
          </button>

          <label style={{ display: 'flex', gap: 8, marginTop: 16, fontSize: 12, color: '#666', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              style={{ marginTop: 3, accentColor: '#B8956A' }}
            />
            <span>
              J'accepte de recevoir la newsletter LULIYANE PARIS. Je peux me désinscrire à tout moment en 1 clic.
            </span>
          </label>

          {message && (
            <p style={{
              marginTop: 12, padding: 10, borderRadius: 6,
              fontSize: 13, textAlign: 'center',
              background: status === 'error' ? '#FEE2E2' : '#DCFCE7',
              color: status === 'error' ? '#991B1B' : '#166534',
            }}>{message}</p>
          )}
        </form>

        <p style={{
          fontSize: 11, color: '#888', textAlign: 'center',
          marginTop: 16, fontStyle: 'italic',
        }}>
          Sans spam. Vos données sont protégées et jamais partagées.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popupEnter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
