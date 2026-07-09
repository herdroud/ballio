import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes publiques (accessibles sans authentification).
// NB : la route /api/webhook a été retirée — aucun webhook n'est implémenté.
// La réintroduire ici le jour où le webhook Clerk (svix) sera mis en place.
const isPublicRoute = createRouteMatcher([
  "/",
  "/quiz(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/legal(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Toute route non listée comme publique exige une session.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
