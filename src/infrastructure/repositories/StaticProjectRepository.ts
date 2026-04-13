import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";

const PROJECTS: Project[] = [
  {
    id: "projeto-alpha",
    title: "Projeto Alpha",
    room: "Full Stack",
    description: "Uma plataforma de gestão full stack construída com Next.js e PostgreSQL. Autenticação robusta, dashboard em tempo real e API RESTful completa.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    year: "2024",
    status: "Completo",
    href: "#",
    featured: true,
  },
  {
    id: "projeto-beta",
    title: "Projeto Beta",
    room: "E-commerce",
    description: "Sistema de e-commerce com pagamentos integrados, carrinho em tempo real via WebSocket e painel administrativo completo.",
    tags: ["React", "Node.js", "Redis", "Stripe"],
    year: "2024",
    status: "Em Produção",
    href: "#",
    featured: true,
  },
  {
    id: "projeto-gamma",
    title: "Projeto Gamma",
    room: "Data Viz",
    description: "Ferramenta de visualização de dados com gráficos interativos, filtros dinâmicos e exportação em múltiplos formatos.",
    tags: ["Vue.js", "D3.js", "Python", "FastAPI"],
    year: "2023",
    status: "Completo",
    href: "#",
    featured: false,
  },
  {
    id: "projeto-delta",
    title: "Projeto Delta",
    room: "Mobile",
    description: "Aplicação mobile-first para gerenciamento de tarefas com sincronização offline e notificações push.",
    tags: ["React Native", "Expo", "Supabase"],
    year: "2023",
    status: "Completo",
    href: "#",
    featured: false,
  },
  {
    id: "projeto-epsilon",
    title: "Projeto Epsilon",
    room: "DevOps",
    description: "CLI de automação de deploy e gerenciamento de infraestrutura para times pequenos com integração GitHub Actions.",
    tags: ["Node.js", "Docker", "GitHub Actions", "Bash"],
    year: "2023",
    status: "Open Source",
    href: "#",
    featured: false,
  },
  {
    id: "projeto-zeta",
    title: "Projeto Zeta",
    room: "AI / ML",
    description: "Chatbot com IA integrada para suporte ao cliente, usando embeddings vetoriais e RAG para respostas contextuais.",
    tags: ["Next.js", "OpenAI", "Pinecone", "Langchain"],
    year: "2024",
    status: "Em Desenvolvimento",
    href: "#",
    featured: false,
  },
];

export class StaticProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    return PROJECTS;
  }

  async getFeatured(): Promise<Project[]> {
    return PROJECTS.filter((p) => p.featured);
  }

  async getById(id: string): Promise<Project | undefined> {
    return PROJECTS.find((p) => p.id === id);
  }
}
