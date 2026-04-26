import { createClient } from "@supabase/supabase-js";

// CLIENT ADMIN (Côté serveur uniquement)
// Utilise la clé SERVICE_ROLE pour contourner les règles RLS
// ⚠️ NE JAMAIS IMPORTER CÔTÉ CLIENT

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase Admin keys are missing in environment variables.");
}

export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
