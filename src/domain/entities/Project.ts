export type ProjectStatus = "Completo" | "Em Produção" | "Open Source" | "Em Desenvolvimento";

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly room: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly year: string;
  readonly status: ProjectStatus;
  readonly href: string;
  readonly featured: boolean;
}
