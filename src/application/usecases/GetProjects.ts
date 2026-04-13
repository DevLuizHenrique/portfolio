import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import type { IGetProjects } from "@/domain/usecases/IGetProjects";

export class GetProjects implements IGetProjects {
  constructor(private readonly repository: IProjectRepository) {}

  async all(): Promise<Project[]> {
    return this.repository.getAll();
  }

  async featured(): Promise<Project[]> {
    return this.repository.getFeatured();
  }

  async notFeatured(): Promise<Project[]> {
    const all = await this.repository.getAll();
    return all.filter((p) => !p.featured);
  }

  async byId(id: string): Promise<Project | undefined> {
    return this.repository.getById(id);
  }
}
