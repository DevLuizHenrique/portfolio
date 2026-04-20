import type { Project } from "../entities/Project";

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | undefined>;
}
