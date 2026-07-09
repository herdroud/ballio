"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { saveQuizResult } from "@/app/actions/quiz";

// LES QUESTIONS (DATA)
const questions = [
  {
    question: "Votre enfant vient de perdre un match important 1-0. Dans la voiture au retour, que faites-vous ?",
    options: [
      { text: "Je lui explique ses erreurs pour qu'il progresse.", score: 0 }, // Erreur classique
      { text: "Je ne dis rien, j'attends qu'il en parle.", score: 10 }, // Bonne attitude
      { text: "Je critique l'arbitre ou le coach pour le consoler.", score: 0 }, // Toxique
      { text: "Je lui demande : 'Qu'est-ce que tu as aimé aujourd'hui ?'", score: 5 }, // Pas mal
    ],
  },
  {
    question: "À quelle fréquence assistez-vous aux entraînements ?",
    options: [
      { text: "Jamais, c'est son moment.", score: 10 },
      { text: "De temps en temps, pour voir les progrès.", score: 5 },
      { text: "Toujours, je veux vérifier que le coach fait bien son travail.", score: 0 }, // Surveillance
      { text: "Souvent, et je lui fais des signes depuis le bord.", score: 0 }, // Pression
    ],
  },
  {
    question: "Votre enfant se plaint d'être fatigué avant l'entraînement. Votre réaction ?",
    options: [
      { text: "On y va quand même, c'est ça le haut niveau !", score: 0 }, // Risque burnout
      { text: "Si tu n'y vas pas, tu ne seras jamais pro.", score: 0 }, // Menace
      { text: "Ok, repose-toi aujourd'hui. On verra demain.", score: 10 }, // Écoute
      { text: "Prends des vitamines et fonce.", score: 2 },
    ],
  },
  {
    question: "Comment réagissez-vous quand il est remplaçant ?",
    options: [
      { text: "C'est injuste, le coach a ses chouchous.", score: 0 }, // Victimisation
      { text: "Travaille plus dur, tu gagneras ta place.", score: 10 }, // Responsabilisation
      { text: "Je vais aller parler au coach.", score: 0 }, // Ingérence
      { text: "Ça arrive, profite-en pour observer le jeu.", score: 8 },
    ],
  },
  {
    question: "Quel est votre rêve pour lui ?",
    options: [
      { text: "Qu'il signe pro et me mette à l'abri financièrement.", score: 0 }, // Pression toxique
      { text: "Qu'il joue en Ligue 1.", score: 2 },
      { text: "Qu'il s'épanouisse, peu importe le niveau.", score: 10 }, // Sain
      { text: "Qu'il soit meilleur que moi à son âge.", score: 0 }, // Projection
    ],
  },
];

export default function QuizPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAnswer = (points: number) => {
    setScore(score + points);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const saveResultAndRedirect = async () => {
    setIsSaving(true);

    let profileType = "Manager Inquiet";
    if (score >= 40) profileType = "Mentor";
    else if (score >= 20) profileType = "Supporter";

    try {
      if (isSignedIn) {
        const result = await saveQuizResult(score, profileType);
        if (!result.success) {
          toast.error(result.error || "Impossible de sauvegarder le résultat.");
          return;
        }
        router.push("/dashboard");
      } else {
        // Non connecté : le résultat est synchronisé après l'inscription
        // (voir le bootstrap du dashboard).
        localStorage.setItem("tempQuizScore", score.toString());
        localStorage.setItem("tempQuizProfile", profileType);
        router.push("/sign-up");
      }
    } catch (error) {
      console.error("Erreur de sauvegarde:", error);
      toast.error("Impossible de sauvegarder. Réessayez.");
    } finally {
      setIsSaving(false);
    }
  };

  // ÉCRAN DE RÉSULTAT
  if (showResult) {
    let profile = "";
    let description = "";
    let color = "";

    if (score >= 40) {
      profile = "Le Parent Mentor 🏆";
      description = "Excellent ! Vous avez la bonne distance. Ballio va vous aider à optimiser les détails (nutrition, mental) pour passer au niveau supérieur.";
      color = "text-green-600";
    } else if (score >= 20) {
      profile = "Le Supporter Passionné ⚠️";
      description = "Attention, votre passion déborde parfois. Vous mettez de la pression sans le vouloir. Ballio va vous aider à corriger ces petites erreurs critiques.";
      color = "text-orange-500";
    } else {
      profile = "Le Manager Inquiet 🚨";
      description = "Urgence. Votre investissement est total, mais vous risquez de braquer votre enfant ou de le dégoûter. Vous avez besoin d'une méthode pour canaliser cette énergie.";
      color = "text-red-600";
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl font-bold">Résultat du Diagnostic</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-8 gap-6">
            <div className="text-6xl mb-2">📊</div>
            <h2 className={`text-3xl font-extrabold ${color}`}>{profile}</h2>
            <p className="text-center text-slate-600 text-lg leading-relaxed">
              {description}
            </p>

            <div className="w-full bg-slate-100 p-4 rounded-lg mt-4 border border-slate-200">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide text-center">
                Score de sérénité
              </p>
              <p className="text-4xl font-bold text-center text-slate-900 mt-2">
                {score} / 50
              </p>
            </div>

            <Button
              className="w-full h-12 text-lg mt-4"
              onClick={saveResultAndRedirect}
              disabled={isSaving}
            >
              {isSaving ? "Sauvegarde en cours..." : "Obtenir mon plan d'action Ballio 👉"}
            </Button>
            <p className="text-xs text-slate-400 text-center">
              100% gratuit · Aucune carte bancaire requise
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ÉCRAN DU QUIZ
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="w-full max-w-lg mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Question {currentQuestion + 1}/{questions.length}</span>
          <span>Ballio Diagnostic</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed text-slate-800">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-2">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto py-4 text-left whitespace-normal hover:bg-slate-100 text-slate-700 border-slate-300"
              onClick={() => handleAnswer(option.score)}
            >
              {option.text}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
