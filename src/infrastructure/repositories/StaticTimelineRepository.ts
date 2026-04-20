import type { TimelineEvent } from "@/domain/entities/TimelineEvent";
import type { ITimelineRepository } from "@/domain/repositories/ITimelineRepository";

const TIMELINE: TimelineEvent[] = [
  { year: "Hoje", title: "Atuação atual", description: "Desenvolvedor Full Stack Pleno com foco principal em Frontend, atuando profissionalmente em contexto corporativo." },
  { year: "Foco", title: "Especialidade", description: "Maior domínio em React.js, Next.js, JavaScript e TypeScript, com direcionamento para vagas de Frontend e Full Stack." },
  { year: "Impacto", title: "Resultado entregue", description: "Participação na entrega de um sistema interno para digitação de documentos com foco em faturamento hospitalar, contribuindo para mais de 87% de ganho de produtividade." },
  { year: "Stack", title: "Evolução técnica", description: "Aprimoramento contínuo em arquitetura, componentização, integrações com APIs e aprofundamento prático em Go (Golang)." },
  { year: "Form.", title: "Formação", description: "Ensino superior em andamento, com desenvolvimento contínuo por meio de prática profissional, projetos e estudos complementares." },
  { year: "Perfil", title: "Modelo e idiomas", description: "Base em Pato Branco - PR, preferência por trabalho remoto e comunicação em português nativo com inglês técnico/básico." },
];

export class StaticTimelineRepository implements ITimelineRepository {
  async getAll(): Promise<TimelineEvent[]> {
    return TIMELINE;
  }
}
