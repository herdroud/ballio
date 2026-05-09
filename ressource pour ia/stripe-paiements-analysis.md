# Analyse complète - Système de paiement Stripe (avant passage en gratuit)

**Date :** 2026-04-27  
**Contexte :** Le projet était initialement payant avec des plans via Stripe, puis lancé gratuitement. Ce document recense tout le code lié aux paiements.

---

## 1. Variables d'environnement

### `.env.local` (lignes 17-27)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_STARTER_PRICE_ID=price_1SycWHR4epMYLkWUwZmLuCjU
STRIPE_PRO_PRICE_ID=price_1SycXNR4epMYLkWUgksAq3YB
STRIPE_WEBHOOK_SECRET=whsec_...
```

### `.env.example` (lignes 10-14)
```bash
# Stripe Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
```

---

## 2. Validation des variables

### `app/lib/env.ts` (lignes 1-25)

```typescript
const requiredEnvVars = [
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",  // ← Ligne 7: Validation de la clé Stripe
];

export function validateEnv() {
    const missing = requiredEnvVars.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            `❌ FATAL ERROR: Missing required environment variables:\n${missing.join(
                "\n"
            )}\n\nPlease check your .env.local file.`
        );
    }
}

// Validate immediately on import (server-side only)
if (typeof window === "undefined") {
    validateEnv();
}
```

**Description :** Valide que `STRIPE_SECRET_KEY` est présent au démarrage du serveur.

---

## 3. Configuration de sécurité (CSP)

### `next.config.ts` (ligne 31)

```typescript
Content-Security-Policy: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com https://*.clerk.accounts.dev https://clerk.ballia.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://*.stripe.com https://img.clerk.com https://*.clerk.accounts.dev; connect-src 'self' https://*.supabase.co https://api.stripe.com https://api.clerk.com https://clerk.ballia.com https://*.clerk.accounts.dev; frame-src 'self' https://js.stripe.com https://*.clerk.accounts.dev; worker-src 'self' blob:;"
```

**Domaines Stripe autorisés :**
- `js.stripe.com` (scripts)
- `api.stripe.com` (appels API)
- `*.stripe.com` (images)

---

## 4. Logique métier des abonnements

### `app/actions/module.ts` (lignes 1-42)

```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

export async function getUserPlan(): Promise<string> {
    try {
        const { userId } = await auth();
        if (!userId) return "free";

        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("subscription_status, current_period_end")  // ← Ligne 13
            .eq("user_id", userId)
            .single();

        const userPlan = profile?.subscription_status || "free";  // ← Ligne 17

        // Un plan est valide s'il n'a pas de date de fin OU si la date de fin est dans le futur
        const isActive = profile?.current_period_end  // ← Ligne 20
            ? new Date(profile.current_period_end) > new Date()  // ← Ligne 21
            : true; // Par défaut s'il n'a pas de date (comme pour free), c'est true. Mais en prod Stripe met une date pour starter/pro. ← Ligne 22

        return isActive ? userPlan : "free";  // ← Ligne 24
    } catch (error) {
        console.error("[GET_USER_PLAN_ERROR]", error);
        return "free";
    }
}

export async function checkModuleAccess(moduleId: string) {
    try {
        const isFree = moduleId === "m0";
        const effectivePlan = await getUserPlan();

        // Tout utilisateur connecté a désormais accès à tous les modules
        return { hasAccess: true, effectivePlan: "free" };  // ← Ligne 37: Accès libre actuellement
    } catch (error) {
        console.error("[CHECK_MODULE_ACCESS_ERROR]", error);
        return { hasAccess: false, effectivePlan: "free" };
    }
}
```

**Description :**
- `getUserPlan()` : Récupère le statut d'abonnement depuis la table `profiles` de Supabase
- Lit les colonnes : `subscription_status` et `current_period_end`
- Plans possibles : `free`, `starter`, `pro`
- `checkModuleAccess()` : Fonction prévue pour restreindre l'accès aux modules selon le plan, mais **actuellement désactivée** (retourne `hasAccess: true` pour tout le monde)

---

## 5. Utilisation du plan dans les composants

### `app/(app)/formation/page.tsx` (lignes 5, 10, 44)

```typescript
import FormationHero from "@/components/formation/FormationHero";
import SpotlightModule from "@/components/formation/SpotlightModule";
import ModuleAccordion from "@/components/formation/ModuleAccordion";
import ToolsGrid from "@/components/formation/ToolsGrid";
import { getUserPlan } from "@/app/actions/module";  // ← Ligne 5
import { getUserProgress } from "@/app/actions/lesson";
import { FORMATION_CONFIG } from "@/app/lib/formation-config";

export default async function FormationPage() {
    const userPlan = await getUserPlan();  // ← Ligne 10: Récupération du plan
    const progressData = await getUserProgress();
    // ...
    <ModuleAccordion userPlan={userPlan} completedModuleIds={completedModuleIds} />  // ← Ligne 44
```

### `components/formation/ModuleAccordion.tsx` (lignes 56-73)

```typescript
export default function ModuleAccordion({
    userPlan = "free",  // ← Ligne 57: Valeur par défaut
    completedModuleIds = []
}: {
    userPlan?: string;  // ← Ligne 60: Prop userPlan
    completedModuleIds?: string[];
}) {
    const effectiveModules = MODULES.map((m, index) => {
        const isDone = completedModuleIds.includes(m.id);
        const isActive = !isDone && (index === 0 || completedModuleIds.includes(MODULES[index - 1].id));
        const state = isDone ? "done" : (isActive ? "active" : "locked");

        return {
            ...m,
            state: state as any,
            progress: isDone ? 100 : (isActive ? 10 : 0)
        };
    });
```

**Description :** Le composant reçoit `userPlan` mais **ne l'utilise pas activement** pour restreindre l'accès. Il n'y a pas de logique "premium" implémentée malgré la présence d'un état `premium` dans `STATE_CONFIG` (lignes 45-53).

---

## 6. Routes API (déclarées mais fichiers manquants)

### `middleware.ts` (ligne 9)

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/quiz(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)"  // ← Ligne 9: Route webhook déclarée publique
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});
```

**Description :** La route `/api/webhook` est déclarée comme publique pour recevoir les webhooks (Stripe/Clerk), mais **le fichier source n'existe pas** dans `app/api/webhook/`.

---

## 7. Pages légales (mentions Stripe)

### `app/(marketing)/legal/terms/page.tsx` (lignes 18-32)

```html
<h2>2. Prix</h2>
<p>
    Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC).
    Ballio se réserve le droit de modifier ses prix à tout moment.
</p>

<h2>3. Commandes et Paiement</h2>  <!-- ← Ligne 24 -->
<p>
    Le paiement est exigible immédiatement à la commande. Le règlement s'effectue par carte bancaire via notre partenaire sécurisé Stripe.  <!-- ← Ligne 26 -->
</p>

<h2>4. Accès aux services</h2>
<p>
    L'accès aux formations est immédiat après validation du paiement et est disponible 24h/24 et 7j/7, sauf cas de force majeure ou maintenance.
</p>
```

### `app/(marketing)/legal/privacy/page.tsx` (lignes 14, 22-24)

```html
<h2>1. Collecte des données</h2>
<p>
    Nous collectons les informations suivantes : nom, prénom, adresse email, informations de paiement (via Stripe).  <!-- ← Ligne 14 -->
</p>

<h2>2. Utilisation des données</h2>
<p>
    Vos données sont utilisées pour : gérer votre compte, vous fournir accès aux formations, et vous envoyer des informations sur nos services.
</p>

<h2>3. Partage des données</h2>  <!-- ← Ligne 22 -->
<p>
    Nous ne vendons pas vos données. Elles sont partagées uniquement avec nos prestataires tiers nécessaires au fonctionnement du service (Stripe pour les paiements, Clerk pour l'authentification, Supabase pour la base de données).  <!-- ← Ligne 24 -->
</p>
```

---

## 8. Composant offre (Landing Page)

### `components/landing/Offer.tsx` (lignes 1-57)

```typescript
"use client";

import { Check, ShieldCheck } from "lucide-react";

export default function Offer() {
    return (
        <section className="py-24 bg-slate-900 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                    Commencer simplement
                </h2>
                <p className="text-xl text-slate-400 mb-12">
                    Ballio est accessible en ligne. À votre rythme. Quand vous en avez besoin.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
                    <ul className="space-y-4">
                        {[
                            "Accès complet à la plateforme",
                            "Contenus clairs et progressifs"
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 text-slate-300 items-center bg-slate-800/50 p-4 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-4">
                        {[
                            "Outils pratiques pour les situations du quotidien",
                            "Mises à jour incluses"
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 text-slate-300 items-center bg-slate-800/50 p-4 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="inline-flex items-center gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
                    <div className="text-left">
                        <h4 className="text-white font-bold mb-1">Garantie sérénité</h4>
                        <p className="text-slate-400 text-sm">
                            Si Ballio ne vous apporte rien, vous arrêtez. Simplement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

**Description :** Présente l'offre mais **aucun prix ni bouton de paiement**. Mentionne une "Garantie sérénité" (remboursement).

---

## 9. Dépendances npm

### `package.json` (ligne 24)

```json
{
    "svix": "^1.86.0"
}
```

**Description :** Bibliothèque `svix` utilisée pour gérer les webhooks (notamment Clerk). Suggère qu'une intégration webhook Clerk était prévue pour synchroniser les utilisateurs avec la base de données.

---

## 10. Schéma de base de données (inféré)

D'après le code `app/actions/module.ts`, la table `profiles` dans Supabase contient :

| Colonne | Type | Description |
|---------|------|-------------|
| `user_id` | UUID/Text | Référence à l'utilisateur Clerk |
| `subscription_status` | Text | Statut : `free`, `starter`, `pro` |
| `current_period_end` | Timestamp | Date de fin de l'abonnement |

---

## 11. Fichiers manquants (présents dans le build `.next`)

| Fichier attendu | État | Chemin |
|-----------------|------|--------|
| Page de pricing | ❌ Manquant | `app/(marketing)/pricing/page.tsx` |
| API Checkout | ❌ Manquant | `app/api/checkout/route.ts` |
| API Webhook | ❌ Manquant | `app/api/webhook/route.ts` |

---

## Récapitulatif des fichiers à nettoyer

| Fichier | Lignes concernées | Action recommandée |
|---------|-------------------|-------------------|
| `.env.local` | 17-27 | Supprimer les variables Stripe |
| `.env.example` | 10-14 | Supprimer les variables Stripe |
| `app/lib/env.ts` | 7 | Retirer `STRIPE_SECRET_KEY` de la validation |
| `next.config.ts` | 31 | Retirer les domaines Stripe de la CSP |
| `app/actions/module.ts` | 1-42 | Supprimer `getUserPlan()` et `checkModuleAccess()` |
| `app/(app)/formation/page.tsx` | 5, 10, 44 | Supprimer l'import et l'usage de `getUserPlan()` |
| `components/formation/ModuleAccordion.tsx` | 56-73 | Supprimer la prop `userPlan` |
| `middleware.ts` | 9 | Retirer `/api/webhook` des routes publiques |
| `app/(marketing)/legal/terms/page.tsx` | 18-32 | Modifier les mentions de paiement |
| `app/(marketing)/legal/privacy/page.tsx` | 14, 22-24 | Modifier les mentions de partage de données |
| `package.json` | 24 | Supprimer la dépendance `svix` |

---

## Conclusion

**Éléments présents ✅**
- Variables d'environnement Stripe complètes
- Validation des variables d'environnement
- Configuration CSP pour Stripe
- Fonction `getUserPlan()` pour lire le statut d'abonnement
- Route webhook déclarée dans le middleware
- Pages légales mentionnant Stripe

**Éléments partiellement implémentés ⚠️**
- `checkModuleAccess()` existe mais ne restreint rien
- `ModuleAccordion` reçoit `userPlan` mais ne l'utilise pas pour bloquer du contenu

**Éléments manquants ❌**
- Page de pricing (supprimée ou non commitée)
- API Checkout (supprimée ou non commitée)
- API Webhook (supprimée ou non commitée)
- Boutons de paiement dans les composants
- Logique de restriction des modules selon le plan
- Intégration Stripe Elements ou Checkout Sessions
