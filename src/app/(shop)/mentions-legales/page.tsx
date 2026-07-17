import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Mentions Légales | LULIYANE PARIS',
  description: 'Mentions légales du site LULIYANE PARIS.',
};

export default function MentionsLegalesPage() {
  return (
    <>
      <LegalPageLayout title="Mentions Légales" lastUpdated="17 Juillet 2026">
        <h2>Éditeur du site</h2>
        <p>
          <strong>Raison sociale :</strong> LULIYANE PARIS<br />
          <strong>Forme juridique :</strong> SASU<br />
          <strong>Capital social :</strong> 1 000 €<br />
          <strong>Siège social :</strong> Paris, France<br />
          <strong>SIRET :</strong> En cours d&apos;immatriculation<br />
          <strong>RCS :</strong> Paris (En cours)<br />
          <strong>Numéro de TVA intracommunautaire :</strong> Non applicable (art. 293 B du CGI)<br />
          <strong>E-mail :</strong> admin@luliyan-paris.com<br />
          <strong>Téléphone :</strong> +33 7 66 67 64 29
        </p>

        <h2>Directeur de la publication</h2>
        <p>L&apos;équipe LULIYANE PARIS</p>

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
          Design &amp; développement : LULIYANE PARIS<br />
          Photographies : Propriété exclusive de LULIYANE PARIS
        </p>
      </LegalPageLayout>
    </>
  );
}