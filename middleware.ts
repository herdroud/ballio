import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//On définit les routes publiques (tout le monde peut voir)
const isPublicRoute = createRouteMatcher([
  "/",
  "/quiz(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  //Si la route n'est PAS publique, on protège
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    //Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    //Always run for API routes
    '/(api|trpc)(.*)',
  ],
};