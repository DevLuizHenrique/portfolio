import type { Project } from "../entities/Project";

export interface IGetProjects {
  all(): Promise<Project[]>;
  byId(id: string): Promise<Project | undefined>;
}
