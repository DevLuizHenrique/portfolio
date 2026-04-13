import type { TimelineEvent } from "@/domain/entities/TimelineEvent";
import type { ITimelineRepository } from "@/domain/repositories/ITimelineRepository";

const TIMELINE: TimelineEvent[] = [
  { year: "2019", title: "Início da Jornada", description: "Primeiros passos com HTML e CSS. A paixão por código começou." },
  { year: "2020", title: "Mergulho no JavaScript", description: "JavaScript e React entraram no repertório. Primeiros projetos freelance." },
  { year: "2021", title: "Full Stack", description: "Node.js, bancos de dados e arquitetura full stack descobertos." },
  { year: "2022", title: "Qualidade & Padrões", description: "TypeScript, testes e boas práticas tornaram-se parte do dia a dia." },
  { year: "2023", title: "Liderança Técnica", description: "Liderança técnica, arquitetura de sistemas e mentoria de equipes." },
  { year: "2024", title: "IA & Inovação", description: "IA, agentes e o futuro do desenvolvimento integrado ao fluxo de trabalho." },
];

export class StaticTimelineRepository implements ITimelineRepository {
  async getAll(): Promise<TimelineEvent[]> {
    return TIMELINE;
  }
}
