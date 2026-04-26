export const metadata = {
    title: "Conditions Générales de Vente | Ballio",
    description: "Consultez nos conditions générales de vente et d'utilisation.",
};

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 prose prose-slate">
            <h1>Conditions Générales de Vente (CGV)</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

            <h2>1. Objet</h2>
            <p>
                Les présentes conditions régissent les ventes de services de formation en ligne par la
                société Ballio.
            </p>

            <h2>2. Prix</h2>
            <p>
                Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC).
                Ballio se réserve le droit de modifier ses prix à tout moment.
            </p>

            <h2>3. Commandes et Paiement</h2>
            <p>
                Le paiement est exigible immédiatement à la commande. Le règlement s'effectue par carte bancaire via notre partenaire sécurisé Stripe.
            </p>

            <h2>4. Accès aux services</h2>
            <p>
                L'accès aux formations est immédiat après validation du paiement et est disponible 24h/24 et 7j/7, sauf cas de force majeure ou maintenance.
            </p>

            <h2>5. Rétractation</h2>
            <p>
                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
            </p>

            <h2>6. Responsabilité</h2>
            <p>
                Ballio ne saurait être tenu pour responsable des dommages résultant d'une mauvaise utilisation du service acheté.
            </p>
        </div>
    );
}
