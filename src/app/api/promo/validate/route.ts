import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { code, cartSubtotal, customerEmail } = await req.json();

  if (!code) return NextResponse.json({ error: 'Code requis' }, { status: 400 });

  const cleanCode = code.toUpperCase().trim();
  
  // Static Validation Bypass Supabase
  let discountPct = 0;
  
  if (cleanCode === 'BIENVENUE') {
    discountPct = 10;
  } else if (cleanCode === 'PM10') {
    discountPct = 20;
  } else if (cleanCode.startsWith('LULI') && cleanCode.length === 8) {
    // Newsletter generated code fallback
    discountPct = 10;
  }

  if (discountPct === 0) {
    return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 404 });
  }

  // Calculate discount
  const discountAmount = cartSubtotal * discountPct / 100;

  return NextResponse.json({
    valid: true,
    code: cleanCode,
    discountAmount: Number(discountAmount.toFixed(2)),
    discountType: 'percentage',
    discountValue: discountPct,
  });
}
