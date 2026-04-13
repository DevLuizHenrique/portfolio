import type { PersonalInfo } from "../entities/PersonalInfo";

export interface IGetPersonalInfo {
  execute(): Promise<PersonalInfo>;
}
