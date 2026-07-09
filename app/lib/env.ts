const requiredEnvVars = [
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    // STRIPE_SECRET_KEY : à réintroduire uniquement quand le paiement sera implémenté.
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
