import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Button, Hr, Link, Font,
} from '@react-email/components';

export function WelcomeDiscountEmail({
  code,
  discountPct = 10,
  minOrderAmount = 50,
  validUntilISO,
}: {
  code: string;
  discountPct?: number;
  minOrderAmount?: number;
  validUntilISO: string;
}) {
  const validUntil = new Date(validUntilISO).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <Html lang="fr">
      <Head>
        <Font
          fontFamily="Cormorant Garamond"
          fallbackFontFamily="Georgia"
          webFont={{ url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap', format: 'woff2' }}
          fontWeight={300}
          fontStyle="normal"
        />
      </Head>
      <Preview>Bienvenue dans le Cercle Luliyane · votre code {code}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>LULIYANE PARIS</Text>
          </Section>

          <Hr style={styles.hr} />

          {/* Editorial intro */}
          <Section style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
            <Text style={styles.microLabel}>─── LE CERCLE ───</Text>
            <Heading as="h1" style={styles.headline}>
              Bienvenue.
            </Heading>
            <Text style={styles.dek}>
              Vous êtes désormais des nôtres. En remerciement,<br />
              voici votre code exclusif de bienvenue.
            </Text>
          </Section>

          {/* THE CODE — hero element */}
          <Section style={{ textAlign: 'center', padding: '20px 20px 40px' }}>
            <Text style={styles.codeLabel}>VOTRE CODE</Text>
            <div style={styles.codeBox}>
              <Text style={styles.code}>{code}</Text>
            </div>
            <Text style={styles.codeDetails}>
              −{discountPct}% sur votre première commande<br />
              À partir de {minOrderAmount} €
            </Text>
            <Text style={styles.validity}>Valable jusqu'au {validUntil}</Text>

            <Button
              href={`https://luliyan-paris.com?utm_source=email&utm_medium=welcome&utm_campaign=welcome_${code}`}
              style={styles.cta}
            >
              DÉCOUVRIR LA COLLECTION
            </Button>
          </Section>

          <Hr style={styles.hr} />

          {/* Brand story */}
          <Section style={{ padding: '32px 20px' }}>
            <Text style={styles.bodyText}>
              LULIYANE PARIS est née d'une conviction simple : la modestie
              n'a jamais été un obstacle à l'élégance. Nos burkinis, abayas
              et hijabs sont pensés et fabriqués avec le même soin que les
              plus belles maisons — pour que vous puissiez porter votre style
              partout, en toute confiance.
            </Text>
            <Text style={{ ...styles.bodyText, marginTop: 16 }}>
              À très bientôt,<br />
              <em style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Sadik, Fondateur
              </em>
            </Text>
          </Section>

          <Hr style={styles.hr} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerLine}>
              LULIYANE PARIS · Ta plage, ton style
            </Text>
            <Text style={styles.footerLine}>
              <Link href="https://instagram.com/luliyane.paris" style={styles.footerLink}>
                Instagram
              </Link>
              {' · '}
              <Link href="https://luliyan-paris.com/contact" style={styles.footerLink}>
                Contact
              </Link>
              {' · '}
              <Link href="https://luliyan-paris.com/faq" style={styles.footerLink}>
                FAQ
              </Link>
            </Text>
            <Text style={styles.footerFine}>
              Vous recevez cet e-mail car vous vous êtes inscrit(e) à notre newsletter.
              <br />
              <Link href="https://luliyan-paris.com/newsletter/unsubscribe" style={styles.footerLink}>
                Se désinscrire
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#F9F7F2',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    margin: 0,
    padding: 0,
  } as any,
  container: {
    backgroundColor: '#FFFFFF',
    maxWidth: 560,
    margin: '40px auto',
    borderRadius: 8,
    overflow: 'hidden',
  } as any,
  header: {
    padding: '32px 20px 16px',
    textAlign: 'center' as const,
  },
  logo: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontSize: 18,
    letterSpacing: '0.2em',
    color: '#2A2A2A',
    fontWeight: 400,
    margin: 0,
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #EEE',
    margin: 0,
  },
  microLabel: {
    fontSize: 11,
    letterSpacing: '0.2em',
    color: '#B8956A',
    textTransform: 'uppercase' as const,
    margin: '0 0 20px',
  },
  headline: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontWeight: 300,
    fontSize: 40,
    color: '#2A2A2A',
    margin: '0 0 16px',
    lineHeight: 1.1,
  },
  dek: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontStyle: 'italic' as const,
    fontSize: 16,
    color: '#666',
    margin: 0,
    lineHeight: 1.5,
  },
  codeLabel: {
    fontSize: 11,
    letterSpacing: '0.2em',
    color: '#888',
    textTransform: 'uppercase' as const,
    margin: '0 0 12px',
  },
  codeBox: {
    display: 'inline-block',
    padding: '20px 32px',
    background: '#F9F5EC',
    border: '1px dashed #B8956A',
    borderRadius: 8,
    margin: '0 auto 16px',
  } as any,
  code: {
    fontFamily: 'Courier, monospace',
    fontSize: 28,
    letterSpacing: '0.1em',
    color: '#2A2A2A',
    fontWeight: 600,
    margin: 0,
  },
  codeDetails: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontStyle: 'italic' as const,
    fontSize: 15,
    color: '#666',
    margin: '0 0 8px',
  },
  validity: {
    fontSize: 12,
    color: '#888',
    margin: '0 0 32px',
  },
  cta: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    padding: '14px 32px',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 13,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    fontWeight: 500,
    display: 'inline-block',
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 1.7,
    color: '#555',
    margin: 0,
  },
  footer: {
    padding: '24px 20px 32px',
    textAlign: 'center' as const,
  },
  footerLine: {
    fontSize: 11,
    color: '#888',
    letterSpacing: '0.1em',
    margin: '0 0 8px',
  },
  footerLink: {
    color: '#B8956A',
    textDecoration: 'none',
  },
  footerFine: {
    fontSize: 10,
    color: '#AAA',
    marginTop: 16,
    lineHeight: 1.6,
  },
};
