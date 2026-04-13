import type { Project } from "../entities/Project";

export interface IGetProjects {
  all(): Promise<Project[]>;
  featured(): Promise<Project[]>;
  notFeatured(): Promise<Project[]>;
  byId(id: string): Promise<Project | undefined>;
}
