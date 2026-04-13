import type { ExtraSkill, SkillGroup } from "../entities/Skill";

export interface IGetSkills {
  groups(): Promise<SkillGroup[]>;
  extras(): Promise<ExtraSkill[]>;
}
