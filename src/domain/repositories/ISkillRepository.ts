import type { ExtraSkill, SkillGroup } from "../entities/Skill";

export interface ISkillRepository {
  getGroups(): Promise<SkillGroup[]>;
  getExtras(): Promise<ExtraSkill[]>;
}
