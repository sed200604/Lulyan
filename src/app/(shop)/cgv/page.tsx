import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import Link from 'next/link';
import { RETURN_WINDOW_DAYS, RETURN_POLICY_LINE } from '@/lib/config/policies';

export const metadata = {
  title: 'Conditions Générales de Vente | LULIYANE PARIS',
  description: 'Conditions Générales de Vente de LULIYANE PARIS.',
};

export default function CGVPage() {
  return (
    <>
      <LegalPageLayout title="Conditions Générales de Vente" lastUpdated="17 Juillet 2026">
        <h2>1. Identification du vendeur</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) sont conclues entre, d&apos;une part, la société LULIYANE PARIS (ci-après &quot;le Vendeur&quot;), dont les coordonnées complètes figurent sur la page <Link href="/mentions-legales" className="underline hover:text-neutral-800">Mentions Légales</Link>, et d&apos;autre part, toute personne physique non commerçante (ci-après &quot;le Client&quot;) souhaitant effectuer un achat via le site luliyan-paris.com.
        </p>

        <h2>2. Champ d&apos;application</h2>
        <p>
          Les présentes CGV s&apos;appliquent, sans restriction ni réserve, à l&apos;ensemble des ventes conclues par le Vendeur auprès de Clients non professionnels, désirant acquérir les produits proposés à la vente sur le site. La validation de la commande par le Client vaut acceptation pleine et entière des présentes CGV.
        </p>

        <h2>3. Produits</h2>
        <p>
          Les produits proposés à la vente sont ceux figurant sur le site au jour de la consultation, accompagnés d&apos;une description détaillée. Ces produits sont proposés dans la limite des stocks disponibles. Les photographies illustrant les produits ne constituent pas un document contractuel.
        </p>

        <h2>4. Prix</h2>
        <p>
          Les prix des produits sont indiqués en euros (EUR) toutes taxes comprises (TTC), tenant compte de la TVA applicable au jour de la commande. Ils s&apos;entendent hors frais de livraison, facturés en supplément, et indiqués avant la validation finale de la commande. Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
        </p>

        <h2>5. Commande</h2>
        <p>
          Le Client peut passer commande sur le site luliyan-paris.com. La création d&apos;un compte client est facultative. Toute commande vaut acceptation des prix et des descriptions des produits disponibles à la vente. Le Vendeur accusera réception de la commande dès sa validation par l&apos;envoi d&apos;un courrier électronique.
        </p>

        <h2>6. Paiement</h2>
        <p>
          Le règlement des achats s&apos;effectue exclusivement en euros. Les modes de paiement acceptés sont les suivants :
        </p>
        <ul>
          <li>Cartes bancaires (Visa, Mastercard, American Express, CB)</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
        </ul>
        <p>
          Les paiements sont sécurisés par notre partenaire Stripe. Le Vendeur n&apos;a jamais accès aux données bancaires du Client, qui sont entièrement chiffrées (SSL). Le prélèvement est effectué au moment de la validation de la commande.
        </p>

        <h2>7. Livraison</h2>
        <p>
          <strong>Zone :</strong> La livraison est actuellement disponible en France métropolitaine uniquement.<br />
          <strong>Délais :</strong> Les commandes sont expédiées et livrées dans un délai de 5 à 7 jours ouvrés après confirmation.<br />
          <strong>Transporteur :</strong> Les livraisons sont assurées par Colissimo.<br />
          <strong>Frais :</strong> Les frais de livraison s&apos;élèvent à 6,90 € et sont offerts pour toute commande d&apos;un montant supérieur ou égal à 150 €.
        </p>

        <h2>8. Droit de rétractation &amp; retours</h2>
        <p>
          Conformément aux dispositions de l&apos;article L221-18 du Code de la consommation, le Client dispose d&apos;un délai légal de 14 jours pour exercer son droit de rétractation. Cependant, à titre de politique commerciale plus favorable, LULIYANE PARIS étend ce délai et permet au Client d&apos;exercer ce droit dans un délai de <strong>{RETURN_WINDOW_DAYS} jours</strong> à compter de la réception du produit.
        </p>
        <p>
          <strong>Modalités :</strong> L&apos;article doit être retourné dans son état d&apos;origine, non porté, non lavé, avec ses étiquettes intactes. Pour les maillots de bain et la lingerie, le sceau d&apos;hygiène doit être rigoureusement intact.<br />
          <strong>Frais de retour :</strong> Les frais de retour sont à la charge du Client, sauf en cas de produit défectueux ou d&apos;erreur de préparation.<br />
          <strong>Remboursement :</strong> Le remboursement sera effectué sous 14 jours après réception et contrôle du retour, par le même moyen de paiement que celui utilisé lors de l&apos;achat.
        </p>
        <p>
          Pour exercer votre droit de rétractation, veuillez nous contacter à l&apos;adresse contact@luliyan-paris.com, ou utiliser le formulaire type de rétractation disponible en annexe de l&apos;article R221-1 du Code de la consommation.
        </p>

        <h2>9. Exclusions du droit de rétractation</h2>
        <p>
          Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les produits qui ont été descellés par le consommateur après la livraison et qui ne peuvent être renvoyés pour des raisons d&apos;hygiène ou de protection de la santé. Cela concerne notamment les maillots de bain et burkinis dont le sceau d&apos;hygiène a été retiré.
        </p>

        <h2>10. Garantie légale de conformité</h2>
        <p>
          Le Client bénéficie de la garantie légale de conformité prévue par les articles L217-4 et suivants du Code de la consommation. Le consommateur dispose d&apos;un délai de deux ans à compter de la délivrance du bien pour obtenir la mise en œuvre de la garantie légale de conformité en cas d&apos;apparition d&apos;un défaut de conformité. Le consommateur est dispensé de rapporter la preuve de l&apos;existence du défaut de conformité durant les vingt-quatre mois suivant la délivrance du bien neuf.
        </p>

        <h2>11. Garantie des vices cachés</h2>
        <p>
          Le Client bénéficie de la garantie contre les défauts cachés de la chose vendue au sens de l&apos;article 1641 du Code civil. L&apos;action résultant des vices rédhibitoires doit être intentée par l&apos;acquéreur dans un délai de deux ans à compter de la découverte du vice.
        </p>

        <h2>12. Service client</h2>
        <p>
          Pour toute question, réclamation ou suivi de commande, notre service client est à votre disposition par e-mail à l&apos;adresse suivante : <strong>admin@luliyan-paris.com</strong>. Nous nous engageons à vous répondre dans les plus brefs délais, du lundi au vendredi de 9h00 à 18h00.
        </p>

        <h2>13. Médiation</h2>
        <p>
          Conformément aux articles L612-1 et suivants du Code de la consommation, le Client a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui l&apos;opposerait au Vendeur. Le Vendeur a désigné comme médiateur de la consommation :<br />
          <strong>CM2C</strong><br />
          14 rue Saint Jean 75017 Paris<br />
          <a href="https://cm2c.net" target="_blank" rel="noopener noreferrer">https://cm2c.net</a>
        </p>

        <h2>14. Droit applicable &amp; juridiction</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut de résolution amiable, les tribunaux français seront seuls compétents. Pour les litiges entre professionnels (B2B), la compétence expresse est attribuée au Tribunal de Commerce de Paris. Pour les litiges avec des consommateurs, le Client peut saisir, à son choix, la juridiction du lieu où il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable.
        </p>

        <h2>15. Modification des CGV</h2>
        <p>
          Le Vendeur se réserve le droit d&apos;adapter ou de modifier à tout moment les présentes CGV. Les CGV applicables à la commande sont celles en vigueur et acceptées par le Client à la date de validation de la commande.
        </p>
      </LegalPageLayout>
    </>
  );
}