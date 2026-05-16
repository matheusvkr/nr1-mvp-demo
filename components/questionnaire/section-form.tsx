"use client";

import { Briefcase, Users, Heart, Shield, User } from "lucide-react";
import { ScaleQuestion } from "./scale-question";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/questionnaire-data";
import { ShortTextarea } from "../ui/shorttextarea";

const ICON_MAP: Record<string, React.ReactNode> = {
  user: <User className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
};

interface SectionFormProps {
  section: Section;
  answers: Record<string, number | string | null>;
  onAnswer: (questionId: string, value: number | string) => void;
}

export function SectionForm({ section, answers, onAnswer }: SectionFormProps) {
  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {ICON_MAP[section.icon]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground leading-tight text-balance">
            {section.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {section.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Questions */}
      <div className="space-y-8">
        {section.questions.map((question, qIndex) => (
          <div key={question.id} className="space-y-4">
            {/* Question label */}
            <div className="flex gap-3">
              <span className="shrink-0 mt-0.5 text-xs font-mono font-bold text-primary/60 w-5 text-right">
                {qIndex + 1}.
              </span>
              <label
                htmlFor={question.type === "textarea" ? question.id : undefined}
                className="text-sm font-medium text-foreground leading-relaxed"
              >
                {question.text}
                {question.required && (
                  <span className="ml-1 text-primary" aria-label="obrigatório">
                    *
                  </span>
                )}
              </label>
            </div>

            {/* Input */}
            <div className="ml-8">
              {question.type === "scale" && (
                <ScaleQuestion
                  id={question.id}
                  value={(answers[question.id] as number) ?? null}
                  onChange={(val) => onAnswer(question.id, val)}
                />
              )}

              {question.type === "textarea" && (
                <textarea
                  id={question.id}
                  rows={question.rows ?? 4}
                  value={(answers[question.id] as string) ?? ""}
                  onChange={(e) => onAnswer(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className={cn(
                    "w-full resize-none rounded-lg border border-input bg-card",
                    "px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary",
                    "transition-colors duration-150 leading-relaxed",
                  )}
                />
              )}

              {question.type === "select" && question.options && (
                <select
                  id={question.id}
                  value={(answers[question.id] as string) ?? ""}
                  onChange={(e) => onAnswer(question.id, e.target.value)}
                  className={cn(
                    "w-full rounded-lg border border-input bg-card",
                    "px-4 py-2.5 text-sm text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary",
                    "transition-colors duration-150 cursor-pointer",
                    !answers[question.id] && "text-muted-foreground",
                  )}
                >
                  <option value="" disabled>
                    Selecione uma opção...
                  </option>
                  {question.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
