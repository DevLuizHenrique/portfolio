import type { PersonalInfo } from "../entities/PersonalInfo";

export interface IPersonalInfoRepository {
  get(): PersonalInfo;
}
