"use client";

import { useState, useCallback } from "react";
import { sections } from "@/lib/questionnaire-data";
import { ProgressBar } from "./progress-bar";
import { SectionForm } from "./section-form";
import { CompletionScreen } from "./completion-screen";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Answers = Record<string, Record<string, number | string | null>>;

function getSectionCompletion(
  sectionId: string,
  answers: Answers
): { filled: number; total: number } {
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return { filled: 0, total: 0 };
  const required = section.questions.filter((q) => q.required);
  const filled = required.filter(
    (q) => answers[sectionId]?.[q.id] != null && answers[sectionId][q.id] !== ""
  ).length;
  return { filled, total: required.length };
}

export function QuestionnaireShell() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [completed, setCompleted] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(
    new Set()
  );
  const [validationError, setValidationError] = useState(false);

  const handleAnswer = useCallback(
    (questionId: string, value: number | string) => {
      const sectionId = sections[currentIndex].id;
      setAnswers((prev) => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          [questionId]: value,
        },
      }));
      setValidationError(false);
    },
    [currentIndex]
  );

  const currentSection = sections[currentIndex];
  const sectionAnswers = answers[currentSection.id] ?? {};
  const { filled, total } = getSectionCompletion(currentSection.id, answers);
  const isCurrentSectionValid = filled === total;

  const handleNext = () => {
    if (!isCurrentSectionValid) {
      setValidationError(true);
      return;
    }
    setCompletedSections((prev) => new Set([...prev, currentIndex]));
    if (currentIndex < sections.length - 1) {
      setCurrentIndex((i) => i + 1);
      setValidationError(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setValidationError(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavigate = (index: number) => {
    // Only allow navigating to completed sections or current
    if (index <= currentIndex || completedSections.has(index)) {
      setCurrentIndex(index);
      setValidationError(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setCompleted(false);
    setCompletedSections(new Set());
    setValidationError(false);
  };

  const isLastSection = currentIndex === sections.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground text-xs font-bold">
                NR
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-foreground leading-none">
                Saúde Mental no Trabalho
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Avaliação NR-1 · Confidencial
              </p>
            </div>
          </div>

          {/* Confidentiality badge */}
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
            🔒 Respostas anônimas
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {completed ? (
          <div className="bg-card rounded-2xl border border-border shadow-sm">
            <CompletionScreen onReset={handleReset} />
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <ProgressBar
                sections={sections}
                currentIndex={currentIndex}
                onNavigate={handleNavigate}
                completedSections={completedSections}
              />
            </div>

            {/* Form card */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8">
              <SectionForm
                section={currentSection}
                answers={sectionAnswers}
                onAnswer={handleAnswer}
              />

              {/* Validation error */}
              {validationError && (
                <div className="mt-6 flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3">
                  <span>⚠</span>
                  <span>
                    Por favor, responda todas as perguntas obrigatórias (
                    <strong>*</strong>) antes de prosseguir.{" "}
                    <span className="text-rose-400">
                      ({filled}/{total} respondidas)
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pb-8">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
                  "text-sm font-medium border border-border",
                  "transition-all duration-150",
                  currentIndex === 0
                    ? "opacity-30 cursor-not-allowed bg-card text-muted-foreground"
                    : "bg-card text-foreground hover:bg-muted hover:border-primary/30"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              {/* Section progress dots (mobile) */}
              <div className="flex items-center gap-1.5 md:hidden">
                {sections.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      i === currentIndex
                        ? "w-4 h-2 bg-primary"
                        : completedSections.has(i)
                        ? "w-2 h-2 bg-[var(--step-complete)]"
                        : "w-2 h-2 bg-border"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl",
                  "text-sm font-semibold transition-all duration-150",
                  isCurrentSectionValid
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                    : "bg-primary/40 text-primary-foreground/70 cursor-not-allowed"
                )}
              >
                {isLastSection ? (
                  <>
                    Enviar avaliação
                    <Send className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Próxima seção
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            Este questionário é confidencial e anônimo. As informações coletadas
            são utilizadas exclusivamente para fins de avaliação e melhoria do
            ambiente de trabalho, em conformidade com a NR-1 (Portaria MTE
            1.419/2024).
          </p>
        </div>
      </footer>
    </div>
  );
}
