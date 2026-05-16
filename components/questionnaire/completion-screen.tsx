"use client";

import { CheckCircle2, RefreshCcw } from "lucide-react";

interface CompletionScreenProps {
  onReset: () => void;
}

export function CompletionScreen({ onReset }: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 space-y-6">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-[var(--step-complete)]/10 flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-[var(--step-complete)]" />
      </div>

      {/* Text */}
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-semibold text-foreground">
          Avaliação concluída!
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Obrigado por participar da avaliação de saúde mental NR-1. Suas
          respostas foram registradas de forma anônima e segura. Os dados serão
          analisados para promover melhorias contínuas no ambiente de trabalho.
        </p>
      </div>

      {/* Info box */}
      <div className="w-full max-w-sm bg-primary/5 border border-primary/10 rounded-xl p-4 text-left space-y-1">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">
          Próximos passos
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed list-none">
          <li className="flex gap-2">
            <span className="text-primary">→</span>
            Os resultados serão compilados pela equipe de RH
          </li>
          <li className="flex gap-2">
            <span className="text-primary">→</span>
            Um plano de ação será elaborado em até 30 dias
          </li>
          <li className="flex gap-2">
            <span className="text-primary">→</span>
            Você será informado sobre as iniciativas implementadas
          </li>
        </ul>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 mt-4"
      >
        <RefreshCcw className="w-4 h-4" />
        Iniciar nova avaliação
      </button>
    </div>
  );
}
