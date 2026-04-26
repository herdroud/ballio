import { createClient } from "@supabase/supabase-js";

// CLIENT AUTHENTIFIÉ (Pour les composants client / server actions avec contexte utilisateur)
// Utilise le token Clerk pour respecter les règles RLS

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase Client keys are missing in environment variables.");
}

export const createSupabaseClient = (clerkToken: string) => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${clerkToken}`,
                },
            },
        }
    );
};
