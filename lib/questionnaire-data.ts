export type QuestionType = "scale" | "textarea" | "select";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

export const sections: Section[] = [
  {
    id: "identification",
    title: "Identificação",
    description: "Informações básicas sobre o colaborador e seu contexto de trabalho.",
    icon: "user",
    questions: [
      {
        id: "name",
        text: "Qual é o seu nome completo?",
        type: "textarea",
        required: true,
        placeholder: "Digite seu nome completo...",
        rows: 1,
      },
      {
        id: "company",
        text: "Em qual empresa você trabalha?",
        type: "select",
        required: true,
        options: [
          "Empresa Alpha S.A.",
          "Beta Indústria e Comércio",
          "Gamma Tecnologia Ltda.",
          "Delta Serviços",
          "Epsilon Consultoria",
          "Outra",
        ],
      },
      {
        id: "department",
        text: "Em qual departamento ou setor você atua?",
        type: "select",
        required: true,
        options: [
          "Operações",
          "Administrativo",
          "Comercial / Vendas",
          "Tecnologia da Informação",
          "Recursos Humanos",
          "Financeiro",
          "Jurídico",
          "Marketing",
          "Logística",
          "Produção",
          "Outro",
        ],
      },
      {
        id: "tenure",
        text: "Há quanto tempo você trabalha nesta empresa?",
        type: "select",
        required: true,
        options: [
          "Menos de 6 meses",
          "6 meses a 1 ano",
          "1 a 3 anos",
          "3 a 5 anos",
          "Mais de 5 anos",
        ],
      },
      {
        id: "work_model",
        text: "Qual é o seu modelo de trabalho atual?",
        type: "select",
        required: true,
        options: ["Presencial", "Remoto (home office)", "Híbrido"],
      },
    ],
  },
  {
    id: "workload",
    title: "Carga e Organização do Trabalho",
    description:
      "Avalie como você percebe a distribuição e organização das suas demandas de trabalho.",
    icon: "briefcase",
    questions: [
      {
        id: "wl_1",
        text: "A quantidade de tarefas atribuídas a mim é compatível com o tempo disponível.",
        type: "scale",
        required: true,
      },
      {
        id: "wl_2",
        text: "Tenho clareza sobre as minhas responsabilidades e o que é esperado de mim.",
        type: "scale",
        required: true,
      },
      {
        id: "wl_3",
        text: "Consigo concluir meu trabalho sem precisar estender meu horário regularmente.",
        type: "scale",
        required: true,
      },
      {
        id: "wl_4",
        text: "As metas e prazos estabelecidos são realistas e alcançáveis.",
        type: "scale",
        required: true,
      },
      {
        id: "wl_open",
        text: "Descreva situações em que a carga de trabalho impactou negativamente sua saúde ou bem-estar.",
        type: "textarea",
        placeholder: "Compartilhe sua experiência de forma livre e anônima...",
      },
    ],
  },
  {
    id: "relationships",
    title: "Relações Interpessoais",
    description:
      "Avalie a qualidade das relações com colegas, lideranças e o ambiente social de trabalho.",
    icon: "users",
    questions: [
      {
        id: "rel_1",
        text: "O relacionamento com meus colegas de equipe é respeitoso e colaborativo.",
        type: "scale",
        required: true,
      },
      {
        id: "rel_2",
        text: "Minha liderança direta demonstra respeito e consideração pelo meu bem-estar.",
        type: "scale",
        required: true,
      },
      {
        id: "rel_3",
        text: "Me sinto à vontade para expressar opiniões e discordâncias sem receio de retaliações.",
        type: "scale",
        required: true,
      },
      {
        id: "rel_4",
        text: "Situações de conflito no ambiente de trabalho são resolvidas de forma saudável.",
        type: "scale",
        required: true,
      },
      {
        id: "rel_open",
        text: "Alguma situação de conflito, assédio ou discriminação foi vivenciada ou testemunhada? Descreva.",
        type: "textarea",
        placeholder: "Suas respostas são confidenciais e protegidas...",
      },
    ],
  },
  {
    id: "wellbeing",
    title: "Saúde e Bem-Estar Mental",
    description:
      "Avalie como o trabalho afeta sua saúde emocional, mental e física no dia a dia.",
    icon: "heart",
    questions: [
      {
        id: "wb_1",
        text: "Ao final do expediente, me sinto emocionalmente esgotado(a).",
        type: "scale",
        required: true,
      },
      {
        id: "wb_2",
        text: "Consigo me desconectar do trabalho durante meus períodos de descanso.",
        type: "scale",
        required: true,
      },
      {
        id: "wb_3",
        text: "Meu trabalho me proporciona senso de propósito e satisfação.",
        type: "scale",
        required: true,
      },
      {
        id: "wb_4",
        text: "Sinto que a empresa se preocupa genuinamente com minha saúde mental.",
        type: "scale",
        required: true,
      },
      {
        id: "wb_open",
        text: "Como o ambiente de trabalho tem influenciado sua saúde mental nos últimos 3 meses?",
        type: "textarea",
        placeholder: "Fique à vontade para compartilhar o que desejar...",
      },
    ],
  },
  {
    id: "support",
    title: "Suporte Organizacional",
    description:
      "Avalie os recursos, apoios e iniciativas disponibilizados pela empresa para seu desenvolvimento e bem-estar.",
    icon: "shield",
    questions: [
      {
        id: "sup_1",
        text: "Tenho acesso a recursos e treinamentos necessários para realizar bem meu trabalho.",
        type: "scale",
        required: true,
      },
      {
        id: "sup_2",
        text: "A empresa oferece canais confiáveis de escuta e apoio psicológico.",
        type: "scale",
        required: true,
      },
      {
        id: "sup_3",
        text: "Existem ações concretas de promoção de saúde mental no meu ambiente de trabalho.",
        type: "scale",
        required: true,
      },
      {
        id: "sup_open",
        text: "Quais melhorias ou iniciativas você gostaria que a empresa implementasse para apoiar a saúde mental dos colaboradores?",
        type: "textarea",
        placeholder: "Sugestões, ideias ou demandas específicas...",
      },
    ],
  },
];
