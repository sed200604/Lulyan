import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Mentions Légales | LULIYANE PARIS',
  description: 'Mentions légales du site LULIYANE PARIS.',
};

export default function MentionsLegalesPage() {
  const isDev = process.env.NODE_ENV === 'development';
  // Check for placeholders in a simple way
  const hasPlaceholders = true; // since it contains [brackets]

  return (
    <>
      {isDev && hasPlaceholders && (
        <div className="bg-amber-100 border border-amber-300 text-amber-900 p-3 text-sm text-center">
          ⚠️ Cette page contient des placeholders. Éditez avant de publier.
        </div>
      )}
      <LegalPageLayout title="Mentions Légales" lastUpdated="[Date]">
        <h2>Éditeur du site</h2>
        <p>
          <strong>Raison sociale :</strong> [LULIYANE PARIS SAS or auto-entrepreneur &quot;Sadik NOM&quot;]<br />
          <strong>Forme juridique :</strong> [SAS / SARL / EURL / Auto-entrepreneur]<br />
          <strong>Capital social :</strong> [XXX €]<br />
          <strong>Siège social :</strong> [Adresse complète]<br />
          <strong>SIRET :</strong> [14-digit number]<br />
          <strong>RCS :</strong> [City] [SIREN]<br />
          <strong>Numéro de TVA intracommunautaire :</strong> [FR XX XXXXXXXXX]<br />
          <strong>E-mail :</strong> contact@luliyan-paris.com<br />
          <strong>Téléphone :</strong> [+33 X XX XX XX XX]
        </p>

        <h2>Directeur de la publication</h2>
        <p>[Full name of legal representative]</p>

        <h2>Hébergeur</h2>
        <p>
          <strong>Vercel Inc.</strong><br />
          340 S Lemon Ave #4133<br />
          Walnut, CA 91789<br />
          États-Unis<br />
          Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est protégé par le droit d&apos;auteur et le droit des marques. Toute reproduction, représentation, modification, publication, ou adaptation totale ou partielle, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de LULIYANE PARIS.
        </p>

        <h2>Crédits</h2>
        <p>
          Design &amp; développement : [Agence ou &quot;en interne&quot;]<br />
          Photographies : [Nom(s) des photographes ou &quot;propriété LULIYANE PARIS&quot;]
        </p>
      </LegalPageLayout>
    </>
  );
}