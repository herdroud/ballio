# ⚽ Ballio

**Le copilote des parents de jeunes footballeurs.** Application gratuite d'accompagnement :
formation parentale (7 modules), check-in bien-être quotidien, suivi de match en direct
avec notation type FIFA, calendrier et statistiques de saison.

## Stack

- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript
- **Clerk** — authentification
- **Supabase** — base de données (PostgreSQL)
- **Tailwind CSS 4** · framer-motion · sonner (toasts)
- **Vitest** — tests unitaires

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés (voir ci-dessous)
npm run dev
```

> ⚠️ Node.js ≥ 20.9 requis (champ `engines` du package.json).

### Variables d'environnement (`.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clé publique Clerk |
| `CLERK_SECRET_KEY` | Clé secrète Clerk |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase (serveur uniquement) |

### Base de données

Le schéma est documenté dans [`docs/supabase_schema.md`](docs/supabase_schema.md).
Les migrations à appliquer sont dans [`supabase/migrations/`](supabase/migrations/) —
exécutez-les dans le SQL Editor de Supabase (elles sont idempotentes).

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npm test` | Tests unitaires (Vitest) |

## Architecture

```
app/
  (marketing)/     Landing page publique + pages légales
  (auth)/          Connexion / inscription (Clerk)
  (app)/           Application (dashboard, formation, check-in, match live…)
  actions/         Server actions (seule couche d'accès aux données)
  lib/             Logique métier pure (stats, bien-être, formation) — testée
  types/           Types TS des tables Supabase et du domaine
components/        Composants React (dashboard, formation, ui)
content/modules/   Contenu HTML/CSS des modules de formation (servi authentifié)
proxy.ts           Protection des routes (Clerk) — tout est privé sauf liste blanche
supabase/          Migrations SQL
tests/             Tests unitaires Vitest
docs/              Schéma BDD, analyses, prototypes archivés
```

### Règles de sécurité

- Les server actions utilisent la clé **service role** (contourne la RLS) : toute
  requête liée à un enfant **doit** passer par `requireOwnedChild()` (`app/actions/child.ts`)
  qui vérifie l'appartenance de l'enfant au parent connecté.
- Aucun accès Supabase direct depuis les composants client.
