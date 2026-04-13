import type { PersonalInfo } from "@/domain/entities/PersonalInfo";
import type { IPersonalInfoRepository } from "@/domain/repositories/IPersonalInfoRepository";
import type { IGetPersonalInfo } from "@/domain/usecases/IGetPersonalInfo";

export class GetPersonalInfo implements IGetPersonalInfo {
  constructor(private readonly repository: IPersonalInfoRepository) {}

  async execute(): Promise<PersonalInfo> {
    return this.repository.get();
  }
}
