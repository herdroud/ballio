export const metadata = {
    title: "Mentions Légales | Ballio",
    description: "Informations légales sur l'éditeur du site Ballio.",
};

export default function MentionsPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 prose prose-slate">
            <h1>Mentions Légales</h1>

            <h2>1. Éditeur du site</h2>
            <p>
                <strong>Nom du site :</strong> Ballio<br />
                <strong>Responsable éditorial :</strong> [Votre Nom / Société]<br />
                <strong>Adresse :</strong> [Votre Adresse]<br />
                <strong>Email :</strong> support@ballio.app<br />
                <strong>SIRET :</strong> [Votre SIRET]
            </p>

            <h2>2. Hébergement</h2>
            <p>
                Le site est hébergé par Vercel Inc.<br />
                340 S Lemon Ave #4133 Walnut, CA 91789, USA.
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
                Tout le contenu du présent site (textes, images, vidéos) est la propriété exclusive de Ballio, sauf mention contraire. Toute reproduction est interdite sans autorisation.
            </p>
        </div>
    );
}
