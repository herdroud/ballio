# 📦 Architecture Supabase - Ballio

Ce document sert de référence technique pour la transition de l'application d'un mode statique (hardcoded) vers un mode dynamique. 

## 🚀 Objectif Global
Rendre l'application dynamique en déportant la logique de données dans Supabase tout en conservant le contenu des leçons de formation en dur dans le code React pour optimiser la performance et le design.

---

## 🛠 Schéma des Tables

### 1. `profiles` (Utilisateurs/Parents)
Gère l'identité du parent et son statut.
- `id` (uuid, PK) : Lié à `auth.users`.
- `user_id` (uuid) : Identifiant unique utilisateur.
- `email` (text) : Email de contact.
- `full_name` (text) : Nom complet du parent.
- `created_at` (timestamp) : Date d'inscription.
- `updated_at` (timestamp) : Dernière mise à jour.

### 2. `children` (Profils Enfants)
Liaison un-à-plusieurs entre un parent et son enfant.
- `id` (uuid, PK)
- `parent_id` (uuid, FK $\rightarrow$ `profiles.id`) : Lien vers le parent.
- `first_name` (text) : Prénom de l'enfant.
- `last_name` (text) : Nom de l'enfant.
- `birth_date` (date) : Date de naissance (crucial pour le calcul de l'âge).
- `club_name` (text) : Club actuel.
- `position` (text) : Poste sur le terrain.
- `created_at` (timestamp)
- `updated_at` (timestamp)

### 3. `user_progress` (Progression Formation)
Suivi dynamique de l'avancement des leçons.
- `id` (uuid, PK)
- `user_id` (uuid, FK $\rightarrow$ `profiles.id`) : Qui a terminé la leçon ?
- `lesson_id` (text) : ID de la leçon en dur (ex: `"m1-intro"`, `"m6-1"`).
- `completed_at` (timestamp) : Date de validation.

### 4. `matches` (Suivi des Matchs)
Enregistrement factuel des rencontres.
- `id` (uuid, PK)
- `child_id` (uuid, FK $\rightarrow$ `children.id`) : Quel enfant a joué ?
- `match_date` (date) : Date du match.
- `opponent` (text) : Nom de l'adversaire.
- `result` (text) : 'victoire', 'défaite', 'nul'.
- `score` (text) : Score final.
- `minutes_played` (int) : Temps de jeu effectif.
- `notes` (text) : Observations globales.

### 5. `match_metrics` (Performance & Évolution)
Données granulaires pour générer les graphiques d'évolution.
- `id` (uuid, PK)
- `match_id` (uuid, FK $\rightarrow$ `matches.id`)
- `metric_name` (text) : Nom de l'indicateur (ex: 'récupérations', 'impact mental').
- `value` (float) : Valeur mesurée.
- `category` (text) : 'technique', 'physique' ou 'mental'.

### 6. `child_wellbeing` (Santé Morale & Physique)
Suivi du bien-être (Check-in quotidien).
- `id` (uuid, PK)
- `child_id` (uuid, FK $\rightarrow$ `children.id`)
- `checkin_date` (date)
- `mood_score` (int) : Humeur (1-5).
- `confidence_level` (int) : Confiance (1-5).
- `stress_level` (int) : Stress (1-5).
- `energy_level` (int) : Énergie (1-5).
- `sleep_quality` (int) : Sommeil (1-5).
- `physical_pain` (boolean) : Présence de douleur.
- `notes` (text) : Commentaires libres.

---

## 💡 Logique de Développement

### Flux de données recommandé :
1. **L'utilisateur se connecte** $\rightarrow$ On récupère son `profile`.
2. **Récupération de l'enfant** $\rightarrow$ On cherche dans `children` l'enfant lié au `parent_id`.
3. **Affichage du Dashboard** $\rightarrow$ On utilise les données de `children` et on calcule la progression en comptant les entrées dans `user_progress`.
4. **Saisie d'un match** $\rightarrow$ On crée une entrée dans `matches`, puis plusieurs entrées dans `match_metrics` pour le même match.

### Notes pour le développeur :
- **Contenu Formation** : Ne PAS créer de table pour le texte des leçons. Le texte reste dans les fichiers `.tsx`. Seul le statut "terminé" va en BDD.
- **Indexation** : Les index sur `parent_id`, `child_id` et `user_id` sont critiques pour maintenir la fluidité de l'application.
- **Sécurité** : Utiliser les RLS (Row Level Security) de Supabase pour que seul le parent puisse voir/modifier les données de son enfant.
