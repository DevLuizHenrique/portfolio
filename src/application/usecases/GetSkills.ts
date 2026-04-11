import type { ExtraSkill, SkillGroup } from "@/domain/entities/Skill";
import type { ISkillRepository } from "@/domain/repositories/ISkillRepository";

export class GetSkills {
  constructor(private readonly repository: ISkillRepository) {}

  groups(): SkillGroup[] {
    return this.repository.getGroups();
  }

  extras(): ExtraSkill[] {
    return this.repository.getExtras();
  }
}
