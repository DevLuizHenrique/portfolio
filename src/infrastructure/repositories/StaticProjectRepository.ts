import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";

const PROJECTS: Project[] = [
  {
    id: "projeto-pdv-elektron",
    title: "PDV-Elektron",
    room: "Full Stack",
    description:
      "MVP de sistema de Ponto de Venda desktop com Electron, React e TypeScript, integrado a backend em Go com SQLite para cadastro de produtos, registro de vendas e geração de arquivos ESC/POS para impressão térmica.",
    tags: [
      "Electron",
      "React",
      "TypeScript",
      "Go",
      "SQLite",
      "GORM",
      "TailwindCSS",
      "shadcn/ui",
      "REST API",
      "ESC/POS",
    ],
    year: "2026",
    status: "Completo",
    href: "https://github.com/DevLuizHenrique/PDV-Elekton",
    featured: true,
  },
  {
    id: "projeto-next-sonarqube",
    title: "Anotar Pedido Landing Page",
    room: "Frontend",
    description:
      "Landing page desenvolvida com Next.js e TypeScript, estruturada com pipeline CI/CD no GitHub Actions e análise estática via SonarQube para manter qualidade, previsibilidade de entrega e evolução contínua.",
    tags: ["Next.js", "TypeScript", "GitHub Actions", "SonarQube", "CI/CD"],
    year: "2025",
    status: "Em Desenvolvimento",
    accessLabel: "Projeto privado",
    featured: true,
    private: true,
  },
  {
    id: "projeto-volkar-online",
    title: "Volkar Online Web Client",
    room: "Frontend / SaaS",
    description:
      "Cliente web para e-commerce SaaS desenvolvido com Next.js e TypeScript, com SSR e SSG para performance, interface responsiva e foco em experiência de navegação e escalabilidade do produto.",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "SSR",
      "SSG",
      "SaaS",
    ],
    year: "2025",
    status: "Completo",
    accessLabel: "Código privado",
    featured: true,
    private: true,
  },
  {
    id: "sistema-faturamento-hospitalar",
    title: "Sistema de Auditoria e Faturamento Hospitalar",
    room: "Frontend",
    description:
      "Atuação no desenvolvimento de um sistema corporativo para digitação de documentos e faturamento hospitalar, com automação de regras, validação de inconsistências e dashboards estratégicos. A entrega contribuiu para mais de 87% de ganho de produtividade no processo.",
    tags: [
      "React.js",
      "TypeScript",
      "Zod",
      "React Hook Form",
      "Apache Echarts",
      "Automação de Regras",
      "Validação de Dados",
      "Relatórios",
    ],
    year: "2024",
    status: "Em Produção",
    href: "https://sinnc.pages.dev/",
    accessLabel: "Ver plataforma",
    private: true,
    featured: true,
  },
];

export class StaticProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    return PROJECTS;
  }

  async getById(id: string): Promise<Project | undefined> {
    return PROJECTS.find((p) => p.id === id);
  }
}
