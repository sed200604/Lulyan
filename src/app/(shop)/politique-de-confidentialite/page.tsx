import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Politique de Confidentialité | LULIYANE PARIS',
  description: 'Politique de Confidentialité (RGPD) du site LULIYANE PARIS.',
};

export default function PrivacyPage() {
  return (
    <>
      <LegalPageLayout title="Politique de Confidentialité" lastUpdated="17 Juillet 2026">
        <h2>1. Identité du responsable de traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées sur le site luliyan-paris.com est la société <strong>LULIYANE PARIS</strong>.<br />
          Pour toute question relative à la protection de vos données, vous pouvez nous contacter à l&apos;adresse suivante : <strong>admin@luliyan-paris.com</strong>.
        </p>

        <h2>2. Données collectées</h2>
        <p>
          Nous pouvons être amenés à collecter et traiter les données suivantes :
        </p>
        <ul>
          <li><strong>Données d&apos;identification :</strong> nom, prénom, adresse e-mail, numéro de téléphone.</li>
          <li><strong>Données de livraison et facturation :</strong> adresse postale, coordonnées de facturation.</li>
          <li><strong>Données de transaction :</strong> historique de vos commandes, détails des achats (les données bancaires ne sont pas stockées sur nos serveurs).</li>
          <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages consultées, via l&apos;utilisation de cookies.</li>
        </ul>

        <h2>3. Finalités et bases légales</h2>
        <p>Vos données sont traitées pour les finalités suivantes :</p>
        <ul>
          <li><strong>Traitement des commandes et livraison :</strong> Base légale : exécution du contrat.</li>
          <li><strong>Service client et gestion des retours :</strong> Base légale : exécution du contrat.</li>
          <li><strong>Envoi de la newsletter et offres promotionnelles :</strong> Base légale : votre consentement.</li>
          <li><strong>Statistiques et mesure d&apos;audience :</strong> Base légale : votre consentement (pour les cookies non essentiels) ou l&apos;intérêt légitime (pour les statistiques anonymisées).</li>
          <li><strong>Respect de nos obligations légales (ex: facturation) :</strong> Base légale : obligation légale.</li>
        </ul>

        <h2>4. Destinataires des données</h2>
        <p>
          Vos données personnelles peuvent être partagées avec des tiers strictement pour les besoins de l&apos;exécution de nos services :
        </p>
        <ul>
          <li><strong>Stripe :</strong> traitement sécurisé des paiements.</li>
          <li><strong>Resend / Klaviyo :</strong> envoi d&apos;e-mails transactionnels et marketing.</li>
          <li><strong>Vercel :</strong> hébergement du site web.</li>
          <li><strong>Supabase :</strong> hébergement de la base de données (serveurs situés en UE, Irlande).</li>
          <li><strong>La Poste / Colissimo :</strong> livraison de vos commandes.</li>
          <li><strong>Meta &amp; Google :</strong> uniquement si vous avez consenti aux cookies publicitaires et d&apos;analyse.</li>
        </ul>

        <h2>5. Transferts hors UE</h2>
        <p>
          Certains de nos sous-traitants (Vercel, Meta, Google) sont situés aux États-Unis. Ces transferts sont strictement encadrés par des Clauses Contractuelles Types (SCC) de la Commission européenne et/ou par le Data Privacy Framework (DPF), garantissant un niveau de protection adéquat de vos données.
        </p>

        <h2>6. Durée de conservation</h2>
        <p>Vos données sont conservées selon les durées suivantes :</p>
        <ul>
          <li><strong>Compte client actif :</strong> pendant toute la durée de la relation commerciale, et jusqu&apos;à 3 ans après votre dernier achat ou interaction.</li>
          <li><strong>Données de facturation et commandes :</strong> 10 ans, conformément à nos obligations légales et comptables.</li>
          <li><strong>Newsletter :</strong> jusqu&apos;au retrait de votre consentement, ou 3 ans après notre dernier contact.</li>
          <li><strong>Cookies :</strong> 13 mois maximum, conformément aux recommandations de la CNIL.</li>
        </ul>

        <h2>7. Vos droits RGPD</h2>
        <p>Conformément à la réglementation (RGPD), vous disposez des droits suivants sur vos données :</p>
        <ul>
          <li><strong>Droit d&apos;accès :</strong> obtenir la confirmation que vos données sont traitées et en obtenir une copie.</li>
          <li><strong>Droit de rectification :</strong> demander la correction de données inexactes ou incomplètes.</li>
          <li><strong>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;) :</strong> demander la suppression de vos données.</li>
          <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données pour des motifs légitimes, notamment à des fins de prospection.</li>
          <li><strong>Droit à la limitation :</strong> demander le gel temporaire de l&apos;utilisation de vos données.</li>
          <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré et lisible.</li>
          <li><strong>Retrait du consentement :</strong> retirer votre consentement à tout moment (ex: désinscription de la newsletter).</li>
        </ul>

        <h2>8. Exercice de vos droits</h2>
        <p>
          Pour exercer l&apos;un de ces droits, veuillez nous envoyer un e-mail à <strong>admin@luliyan-paris.com</strong>, en joignant, si nécessaire, un justificatif d&apos;identité. Nous nous engageons à vous répondre dans un délai d&apos;un mois.
        </p>
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (3 Place de Fontenoy, 75007 Paris - <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>

        <h2>9. Gestion des cookies</h2>
        <p>
          Un &quot;cookie&quot; est un petit fichier texte déposé sur votre terminal lors de la visite de notre site. Nous utilisons :
        </p>
        <ul>
          <li><strong>Cookies strictement nécessaires :</strong> indispensables au fonctionnement du site (panier, session). Ils ne requièrent pas de consentement.</li>
          <li><strong>Cookies analytiques :</strong> pour comprendre comment notre site est utilisé et l&apos;améliorer (soumis à consentement).</li>
          <li><strong>Cookies publicitaires :</strong> pour vous proposer des annonces adaptées à vos centres d&apos;intérêt (soumis à consentement).</li>
        </ul>
        <p>
          Vous pouvez à tout moment modifier vos préférences via notre bannière de gestion des cookies située en bas de page.
        </p>
      </LegalPageLayout>
    </>
  );
}
