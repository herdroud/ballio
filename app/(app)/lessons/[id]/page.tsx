"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlayCircle, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getLesson } from "@/app/actions/lesson";
import type { Lesson } from "@/app/lib/lessons-data";
import LessonCompleteButton from "@/components/lesson/LessonCompleteButton";

export default function LessonPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const params = useParams();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requiredTier, setRequiredTier] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const lessonId = params.id as string;

  // 2. VÉRIFICATION DES ACCÈS VIA SERVER ACTION
  useEffect(() => {
    async function fetchLesson() {
      if (!isUserLoaded) return;

      // Accès public non autorisé (ou redirection vers login)
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await getLesson(lessonId);

        if (result.success) {
          setLesson(result.lesson);
          setIsCompleted(result.isCompleted);
        } else {
          setError(result.error);
          if (result.requiredTier) {
            setRequiredTier(result.requiredTier);
          }
        }
      } catch (err) {
        console.error("Erreur fetch lesson:", err);
        setError("server_error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLesson();
  }, [user, isUserLoaded, lessonId]);

  // 3. AFFICHAGES CONDITIONNELS
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">
        Chargement du contenu...
      </div>
    );
  }

  // Redirection si non connecté
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Veuillez vous connecter pour accéder au contenu.</p>
        <Link href="/sign-in">
          <Button>Se connecter</Button>
        </Link>
      </div>
    );
  }

  // NOT FOUND ou AUTRE ERREUR
  if (!lesson || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">
          {error === "not_found" ? "Leçon introuvable." : "Une erreur est survenue."}
        </p>
        <Link href="/dashboard">
          <Button variant="outline">Retour au Dashboard</Button>
        </Link>
      </div>
    );
  }

  // 4. AFFICHAGE DE LA LEÇON (CONTENU SÉCURISÉ)
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="border-b bg-slate-50 p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2">
            <ChevronLeft size={20} /> Retour
          </Button>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lesson.subtitle}</p>
            <h1 className="text-sm font-bold text-slate-900">{lesson.title}</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Vidéo */}
          <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl border-4 border-slate-100">
            {lesson.videoUrl ? (
              <iframe
                className="w-full h-full"
                src={lesson.videoUrl}
                title="Vidéo de formation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-center text-slate-400">
                <PlayCircle size={64} className="mx-auto mb-4 opacity-20" />
                <p>Vidéo en cours de préparation...</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">À propos de cette leçon</h2>
            <p className="text-slate-600 leading-relaxed text-lg italic">"{lesson.description}"</p>
            <div className="prose prose-slate max-w-none pt-4 border-t whitespace-pre-line text-slate-700">
              {lesson.content}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl sticky top-24">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-blue-200" />
              <h3 className="font-bold text-xl">L'action du jour</h3>
            </div>
            <p className="text-blue-50 leading-relaxed mb-6">{lesson.actionItem}</p>
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-6 rounded-xl shadow-lg">
              J'ai terminé cette leçon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
