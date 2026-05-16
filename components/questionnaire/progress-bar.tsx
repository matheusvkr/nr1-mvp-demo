"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Section } from "@/lib/questionnaire-data";

interface ProgressBarProps {
  sections: Section[];
  currentIndex: number;
  onNavigate?: (index: number) => void;
  completedSections: Set<number>;
}

export function ProgressBar({
  sections,
  currentIndex,
  onNavigate,
  completedSections,
}: ProgressBarProps) {
  const progressPercent = Math.round(
    ((currentIndex + 1) / sections.length) * 100,
  );

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Progresso
        </span>
        <span className="text-xs font-semibold text-primary">
          {currentIndex + 1} / {sections.length}
        </span>
      </div>

      {/* Linear progress track */}
      <div className="w-full h-1 bg-border rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: "var(--progress-fill)",
          }}
        />
      </div>

      {/* Step indicators — horizontal on desktop, hidden labels on mobile */}
      <nav
        aria-label="Seções do questionário"
        className="hidden md:flex items-start gap-0"
      >
        {sections.map((section, index) => {
          const isCompleted = completedSections.has(index);
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate?.(index)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1.5 group cursor-pointer disabled:cursor-default",
                !onNavigate && "pointer-events-none",
              )}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Seção ${index + 1}: ${section.title}`}
            >
              {/* Dot */}
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 border-2",
                  isActive &&
                    "bg-primary border-primary text-primary-foreground shadow-md scale-110",
                  isCompleted &&
                    !isActive &&
                    "bg-[var(--step-complete)] border-[var(--step-complete)] text-white",
                  !isActive &&
                    !isCompleted &&
                    "bg-card border-border text-muted-foreground group-hover:border-primary/50",
                )}
              >
                {isCompleted && !isActive ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] leading-tight text-center font-medium max-w-[70px] transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {section.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile: section name only */}
      <div className="md:hidden">
        <p className="text-sm font-semibold text-foreground">
          {sections[currentIndex].title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {sections.map((s) => s.title).join(" → ")}
        </p>
      </div>
    </div>
  );
}
