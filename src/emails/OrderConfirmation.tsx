import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Button, Hr, Link, Row, Column, Img,
} from '@react-email/components';
import { getHijabByColor, HIJAB_COLORS } from '../data/hijab-gift';

type Item = {
  name: string;
  variant?: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageUrl?: string;
};

type GiftItem = {
  sku: string;
  color: string;
  linked_to_burkini_sku: string;
};

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  giftItems = [],
  subtotal,
  shippingCost,
  discountAmount = 0,
  totalAmount,
  shippingAddress,
  deliveryFrom,
  deliveryTo,
}: {
  orderNumber: string | number;
  customerName: string;
  items: Item[];
  giftItems?: GiftItem[];
  subtotal: number;
  shippingCost: number;
  discountAmount?: number;
  totalAmount: number;
  shippingAddress: { line1: string; line2?: string | null; postalCode: string; city: string; country: string };
  deliveryFrom: string;
  deliveryTo: string;
}) {
  const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  return (
    <Html lang="fr">
      <Head />
      <Preview>Commande #{orderNumber} confirmée · Livraison entre le {fmtDate(deliveryFrom)} et {fmtDate(deliveryTo)}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          {/* Header */}
          <Section style={s.header}>
            <Text style={s.logo}>LULIYANE PARIS</Text>
          </Section>
          <Hr style={s.hr} />

          {/* Confirmation */}
          <Section style={{ textAlign: 'center', padding: '40px 20px 24px' }}>
            <div style={{ fontSize: 40, color: '#166534', marginBottom: 12 }}>✓</div>
            <Text style={s.microLabel}>─── COMMANDE CONFIRMÉE ───</Text>
            <Heading as="h1" style={s.headline}>
              Merci{customerName ? `, ${customerName.split(' ')[0]}` : ''}.
            </Heading>
            <Text style={s.dek}>
              Votre commande <strong>#{orderNumber}</strong> a bien été reçue.<br />
              Un e-mail de suivi vous sera envoyé dès son expédition.
            </Text>
          </Section>

          <Hr style={s.hr} />

          {/* Delivery estimate */}
          <Section style={{ padding: '24px 20px', backgroundColor: '#F5F0E8' }}>
            <Text style={s.deliveryLabel}>LIVRAISON ESTIMÉE</Text>
            <Text style={s.deliveryDate}>
              Entre le {fmtDate(deliveryFrom)} et le {fmtDate(deliveryTo)}
            </Text>
            <Text style={s.deliveryAddress}>
              {shippingAddress.line1}<br />
              {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
              {shippingAddress.postalCode} {shippingAddress.city}<br />
              {shippingAddress.country}
            </Text>
          </Section>

          <Hr style={s.hr} />

          {/* Items */}
          <Section style={{ padding: '24px 20px' }}>
            <Text style={s.sectionLabel}>VOTRE COMMANDE</Text>

            {items.map((item, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid #F5F5F5', padding: '12px 0' }}>
                <Row>
                  {item.imageUrl && (
                    <Column style={{ width: 72, verticalAlign: 'top' }}>
                      <Img src={item.imageUrl} alt={item.name} width="56" height="72" style={{ borderRadius: 4 }} />
                    </Column>
                  )}
                  <Column>
                    <Text style={s.itemName}>{item.name}</Text>
                    {item.variant && <Text style={s.itemVariant}>{item.variant}</Text>}
                    <Text style={s.itemQty}>Qté {item.quantity} · {eur(item.unitPrice)} chacun</Text>
                  </Column>
                  <Column align="right" style={{ verticalAlign: 'top' }}>
                    <Text style={s.itemPrice}>{eur(item.lineTotal)}</Text>
                  </Column>
                </Row>
              </div>
            ))}

            {giftItems && giftItems.length > 0 && (
              <div style={{ marginTop: 24, padding: '16px', backgroundColor: '#F9F7F2', borderRadius: 6, border: '1px dashed #B8956A' }}>
                <Text style={{ ...s.sectionLabel, color: '#B8956A', margin: '0 0 12px' }}>🎁 EN CADEAU</Text>
                {giftItems.map((gift, idx) => {
                  const slug = HIJAB_COLORS.find(c => c.name.toLowerCase() === gift.color.toLowerCase())?.slug || 'champagne';
                  const hijabData = getHijabByColor(slug);
                  const absoluteUrl = hijabData ? `https://luliyan-paris.com${hijabData.imageUrl}` : '';
                  return (
                    <Row key={idx} style={{ marginBottom: idx === giftItems.length - 1 ? 0 : 12 }}>
                      {absoluteUrl && (
                        <Column style={{ width: 72, verticalAlign: 'top', paddingRight: 16 }}>
                          <Img src={absoluteUrl} alt={hijabData?.altText} width="56" height="72" style={{ borderRadius: 4, objectFit: 'cover' }} />
                        </Column>
                      )}
                      <Column>
                        <Text style={s.itemName}>Hijab d'Été (Édition Limitée)</Text>
                        <Text style={s.itemVariant}>Couleur : {gift.color}</Text>
                        <Text style={s.itemQty}>Offert avec votre commande</Text>
                      </Column>
                      <Column align="right" style={{ verticalAlign: 'top' }}>
                        <Text style={s.itemPrice}>Offert</Text>
                        <Text style={{ fontSize: 12, color: '#888', textDecoration: 'line-through' }}>{eur(25)}</Text>
                      </Column>
                    </Row>
                  );
                })}
              </div>
            )}

            {/* Totals */}
            <div style={{ marginTop: 16 }}>
              <Row style={{ marginBottom: 4 }}>
                <Column><Text style={s.totalRow}>Sous-total</Text></Column>
                <Column align="right"><Text style={s.totalRow}>{eur(subtotal)}</Text></Column>
              </Row>
              <Row style={{ marginBottom: 4 }}>
                <Column><Text style={s.totalRow}>Livraison</Text></Column>
                <Column align="right">
                  <Text style={s.totalRow}>{shippingCost === 0 ? 'Offerte' : eur(shippingCost)}</Text>
                </Column>
              </Row>
              {discountAmount > 0 && (
                <Row style={{ marginBottom: 4 }}>
                  <Column><Text style={{ ...s.totalRow, color: '#B8956A' }}>Réduction</Text></Column>
                  <Column align="right"><Text style={{ ...s.totalRow, color: '#B8956A' }}>−{eur(discountAmount)}</Text></Column>
                </Row>
              )}
              <div style={{ borderTop: '1px solid #EEE', marginTop: 8, paddingTop: 8 }}>
                <Row>
                  <Column><Text style={s.totalGrand}>TOTAL</Text></Column>
                  <Column align="right"><Text style={s.totalGrand}>{eur(totalAmount)}</Text></Column>
                </Row>
              </div>
            </div>
          </Section>

          <Hr style={s.hr} />

          {/* Support */}
          <Section style={{ padding: '24px 20px', textAlign: 'center' }}>
            <Text style={s.bodyText}>
              Une question sur votre commande ?<br />
              Nous sommes là pour vous aider.
            </Text>
            <Button href="https://luliyan-paris.com/contact" style={s.ctaGhost}>
              CONTACTER LE SERVICE CLIENT
            </Button>
          </Section>

          <Hr style={s.hr} />

          {/* Footer */}
          <Section style={s.footer}>
            <Text style={s.footerLine}>LULIYANE PARIS · Ta plage, ton style</Text>
            <Text style={s.footerLine}>
              <Link href="https://instagram.com/luliyane.paris" style={s.footerLink}>Instagram</Link>
              {' · '}
              <Link href="https://luliyan-paris.com/faq" style={s.footerLink}>FAQ</Link>
              {' · '}
              <Link href="https://luliyan-paris.com/politique-de-remboursement" style={s.footerLink}>Retours</Link>
            </Text>
            <Text style={s.footerFine}>
              Cet e-mail concerne votre commande #{orderNumber}. Conservez-le pour vos dossiers.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const s = {
  body: { backgroundColor: '#F9F7F2', fontFamily: 'Inter, sans-serif', margin: 0, padding: 0 } as any,
  container: { backgroundColor: '#FFFFFF', maxWidth: 600, margin: '40px auto', borderRadius: 8, overflow: 'hidden' } as any,
  header: { padding: '32px 20px 16px', textAlign: 'center' as const },
  logo: { fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 18, letterSpacing: '0.2em', color: '#2A2A2A', margin: 0 },
  hr: { border: 'none', borderTop: '1px solid #EEE', margin: 0 },
  microLabel: { fontSize: 11, letterSpacing: '0.2em', color: '#B8956A', textTransform: 'uppercase' as const, margin: '0 0 12px' },
  headline: { fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 300, fontSize: 32, color: '#2A2A2A', margin: '0 0 12px', lineHeight: 1.15 },
  dek: { fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' as const, fontSize: 15, color: '#666', margin: 0, lineHeight: 1.5 },
  deliveryLabel: { fontSize: 11, letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase' as const, margin: '0 0 8px' },
  deliveryDate: { fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 18, color: '#2A2A2A', margin: '0 0 12px' },
  deliveryAddress: { fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 },
  sectionLabel: { fontSize: 11, letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase' as const, margin: '0 0 16px' },
  itemName: { fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 15, color: '#2A2A2A', margin: 0 },
  itemVariant: { fontSize: 12, color: '#888', margin: '2px 0' },
  itemQty: { fontSize: 12, color: '#888', margin: 0 },
  itemPrice: { fontSize: 14, color: '#2A2A2A', fontWeight: 500, margin: 0 },
  totalRow: { fontSize: 14, color: '#555', margin: 0, padding: '4px 0' },
  totalGrand: { fontSize: 16, color: '#2A2A2A', fontWeight: 600, margin: 0 },
  bodyText: { fontSize: 14, color: '#555', lineHeight: 1.6, margin: '0 0 16px' },
  ctaGhost: { backgroundColor: 'transparent', color: '#2A2A2A', border: '1px solid #DDD', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'inline-block' },
  footer: { padding: '24px 20px 32px', textAlign: 'center' as const, backgroundColor: '#F9F7F2' },
  footerLine: { fontSize: 11, color: '#888', letterSpacing: '0.1em', margin: '0 0 8px' },
  footerLink: { color: '#B8956A', textDecoration: 'none' },
  footerFine: { fontSize: 10, color: '#AAA', marginTop: 16, lineHeight: 1.6 },
};
