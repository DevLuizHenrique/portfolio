import type { Project } from "../entities/Project";

export interface IProjectRepository {
  getAll(): Project[];
  getFeatured(): Project[];
  getById(id: string): Project | undefined;
}
