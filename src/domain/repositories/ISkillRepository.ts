import type { ExtraSkill, SkillGroup } from "../entities/Skill";

export interface ISkillRepository {
  getGroups(): SkillGroup[];
  getExtras(): ExtraSkill[];
}
