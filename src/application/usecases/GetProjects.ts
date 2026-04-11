import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";

export class GetProjects {
  constructor(private readonly repository: IProjectRepository) {}

  all(): Project[] {
    return this.repository.getAll();
  }

  featured(): Project[] {
    return this.repository.getFeatured();
  }

  notFeatured(): Project[] {
    return this.repository.getAll().filter((p) => !p.featured);
  }

  byId(id: string): Project | undefined {
    return this.repository.getById(id);
  }
}
