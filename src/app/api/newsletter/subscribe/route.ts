import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WelcomeDiscountEmail } from '@/emails/WelcomeDiscount';
import { supabase } from '@/lib/supabase';

// Generate a unique 8-char discount code
function generateCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no confusing chars
  let out = 'LULI';
  for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('[newsletter/subscribe] RESEND_API_KEY is missing');
      return NextResponse.json(
        { error: "La configuration d'email n'est pas prête." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY.trim());
    const { email } = await req.json();

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'E-mail invalide' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    
    // Insert into Supabase
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: normalizedEmail, source: 'welcome_popup' });
      
    if (dbError && dbError.code !== '23505') { // 23505 is unique constraint violation (already subscribed)
      console.error('[newsletter/subscribe] supabase error:', dbError);
    }

    // Bypass Supabase: Generate unique discount code locally
    const code = generateCode();

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    // Send welcome email directly without checking/inserting into DB
    const { error: emailError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'bonjour@luliyan-paris.com',
      to: normalizedEmail,
      replyTo: process.env.EMAIL_REPLY_TO || 'contact@luliyan-paris.com',
      subject: `Bienvenue dans le Cercle Luliyane · votre code ${code}`,
      react: WelcomeDiscountEmail({
        code,
        discountPct: 10,
        minOrderAmount: 50,
        validUntilISO: validUntil.toISOString(),
      }),
    });

    if (emailError) throw emailError;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[newsletter/subscribe]', err);
    return NextResponse.json(
      { error: err.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
