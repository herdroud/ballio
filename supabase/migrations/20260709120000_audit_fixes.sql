-- ============================================================================
-- Migration issue de l'audit du 9 juillet 2026
-- À exécuter dans le SQL Editor de Supabase (ou via `supabase db push`).
-- Toutes les instructions sont idempotentes (IF NOT EXISTS / ON CONFLICT).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Table `leads` — capture des e-mails de la landing page (C3)
--    Écrite uniquement côté serveur (service role) : RLS activée sans policy.
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
    id          uuid primary key default gen_random_uuid(),
    email       text not null unique,
    source      text,                     -- "hero" | "quiz" | "final"
    created_at  timestamptz not null default now()
);

alter table public.leads enable row level security;

-- ----------------------------------------------------------------------------
-- 2. Table `planned_matches` — calendrier des matchs à venir (E2)
--    Écrite uniquement côté serveur (service role) : RLS activée sans policy.
-- ----------------------------------------------------------------------------
create table if not exists public.planned_matches (
    id          uuid primary key default gen_random_uuid(),
    child_id    uuid not null references public.children (id) on delete cascade,
    opponent    text not null,
    match_date  date not null,
    match_time  text,
    location    text not null default 'Domicile' check (location in ('Domicile', 'Extérieur')),
    status      text not null default 'upcoming' check (status in ('upcoming', 'won', 'lost', 'draw', 'cancelled')),
    created_at  timestamptz not null default now()
);

create index if not exists planned_matches_child_date_idx
    on public.planned_matches (child_id, match_date);

alter table public.planned_matches enable row level security;

-- ----------------------------------------------------------------------------
-- 3. Contraintes d'unicité — protection contre les doublons (E4)
--    NB : `children (parent_id)` unique = un seul enfant par parent.
--    À supprimer le jour où le multi-enfants est introduit.
-- ----------------------------------------------------------------------------
create unique index if not exists profiles_user_id_key
    on public.profiles (user_id);

create unique index if not exists children_parent_id_key
    on public.children (parent_id);

create unique index if not exists user_progress_user_lesson_key
    on public.user_progress (user_id, lesson_id);

-- Nécessaire au `upsert … onConflict: 'child_id,checkin_date'` du check-in.
create unique index if not exists child_wellbeing_child_date_key
    on public.child_wellbeing (child_id, checkin_date);

-- ----------------------------------------------------------------------------
-- 4. Nettoyage des éventuels doublons créés avant ces contraintes.
--    ⚠️ Exécuter AVANT les index ci-dessus si la création d'index échoue
--    pour cause de doublons existants :
--
--    delete from public.children c using public.children c2
--      where c.parent_id = c2.parent_id and c.created_at > c2.created_at;
--    delete from public.profiles p using public.profiles p2
--      where p.user_id = p2.user_id and p.created_at > p2.created_at;
-- ----------------------------------------------------------------------------
