import type { TimelineEvent } from "@/domain/entities/TimelineEvent";
import type { ITimelineRepository } from "@/domain/repositories/ITimelineRepository";

const TIMELINE: TimelineEvent[] = [
  {
    year: "2019",
    title: "Início da Jornada",
    description: "Primeiros encantamentos com HTML e CSS. A magia começou.",
  },
  {
    year: "2020",
    title: "Aprendiz de Feiticeiro",
    description: "JavaScript e React entraram no grimório. Projetos freelance nasceram.",
  },
  {
    year: "2021",
    title: "Estudante de Hogwarts",
    description: "Node.js, bancos de dados e arquitetura full stack descobertos.",
  },
  {
    year: "2022",
    title: "Membro da Ordem",
    description: "TypeScript, testes e boas práticas tornaram-se rituais diários.",
  },
  {
    year: "2023",
    title: "Guardião do Mapa",
    description: "Liderança técnica, arquitetura de sistemas e mentoria de equipes.",
  },
  {
    year: "2024",
    title: "Mestre das Artes",
    description: "IA, agentes e o futuro do desenvolvimento integrado ao fluxo de trabalho.",
  },
];

export class StaticTimelineRepository implements ITimelineRepository {
  getAll(): TimelineEvent[] {
    return TIMELINE;
  }
}
