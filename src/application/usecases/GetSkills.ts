import type { ExtraSkill, SkillGroup } from "@/domain/entities/Skill";
import type { ISkillRepository } from "@/domain/repositories/ISkillRepository";
import type { IGetSkills } from "@/domain/usecases/IGetSkills";

export class GetSkills implements IGetSkills {
  constructor(private readonly repository: ISkillRepository) {}

  async groups(): Promise<SkillGroup[]> {
    return this.repository.getGroups();
  }

  async extras(): Promise<ExtraSkill[]> {
    return this.repository.getExtras();
  }
}
