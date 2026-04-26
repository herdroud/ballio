export const metadata = {
    title: "Politique de Confidentialité | Ballio",
    description: "Découvrez comment nous protégeons vos données personnelles.",
};

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 prose prose-slate">
            <h1>Politique de Confidentialité</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

            <h2>1. Collecte des données</h2>
            <p>
                Nous collectons les informations suivantes : nom, prénom, adresse email, informations de paiement (via Stripe).
            </p>

            <h2>2. Utilisation des données</h2>
            <p>
                Vos données sont utilisées pour : gérer votre compte, vous fournir accès aux formations, et vous envoyer des informations sur nos services.
            </p>

            <h2>3. Partage des données</h2>
            <p>
                Nous ne vendons pas vos données. Elles sont partagées uniquement avec nos prestataires tiers nécessaires au fonctionnement du service (Stripe pour les paiements, Clerk pour l'authentification, Supabase pour la base de données).
            </p>

            <h2>4. Vos droits (RGPD)</h2>
            <p>
                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous à support@ballio.app.
            </p>

            <h2>5. Cookies</h2>
            <p>
                Nous utilisons des cookies essentiels pour le fonctionnement de l'application (session, sécurité).
            </p>
        </div>
    );
}
