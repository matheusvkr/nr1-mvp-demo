"use client";

import { cn } from "@/lib/utils";

interface ScaleQuestionProps {
  id: string;
  value: number | null;
  onChange: (value: number) => void;
}

const SCALE_LABELS: Record<number, string> = {
  1: "Discordo totalmente",
  2: "Discordo parcialmente",
  3: "Neutro",
  4: "Concordo parcialmente",
  5: "Concordo totalmente",
};

const SCALE_COLORS: Record<number, string> = {
  1: "text-rose-500",
  2: "text-orange-400",
  3: "text-amber-400",
  4: "text-emerald-400",
  5: "text-emerald-600",
};

export function ScaleQuestion({ id, value, onChange }: ScaleQuestionProps) {
  return (
    <fieldset className="w-full">
      <legend className="sr-only">Escala de 1 a 5</legend>

      {/* Labels extremos */}
      <div className="flex justify-between mb-3">
        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
          Discordo totalmente
        </span>
        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
          Concordo totalmente
        </span>
      </div>

      {/* Radio buttons */}
      <div className="flex items-center justify-between gap-2">
        {[1, 2, 3, 4, 5].map((num) => {
          const isSelected = value === num;
          return (
            <label
              key={num}
              htmlFor={`${id}_${num}`}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 cursor-pointer group"
              )}
            >
              <input
                type="radio"
                id={`${id}_${num}`}
                name={id}
                value={num}
                checked={isSelected}
                onChange={() => onChange(num)}
                className="sr-only"
              />
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                  "text-sm font-semibold transition-all duration-150",
                  "group-hover:scale-105",
                  isSelected
                    ? cn(
                        "border-primary bg-primary text-primary-foreground shadow-md scale-110",
                      )
                    : "border-border bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"
                )}
              >
                {num}
              </div>
              <span
                className={cn(
                  "text-[10px] text-center leading-tight font-medium transition-colors duration-150",
                  isSelected
                    ? SCALE_COLORS[num]
                    : "text-muted-foreground/60"
                )}
              >
                {SCALE_LABELS[num]}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
