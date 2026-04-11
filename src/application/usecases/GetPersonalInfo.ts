import type { PersonalInfo } from "@/domain/entities/PersonalInfo";
import type { IPersonalInfoRepository } from "@/domain/repositories/IPersonalInfoRepository";

export class GetPersonalInfo {
  constructor(private readonly repository: IPersonalInfoRepository) {}

  execute(): PersonalInfo {
    return this.repository.get();
  }
}
