import type { IGetPersonalInfo } from "@/domain/usecases/IGetPersonalInfo";
import type { IGetProjects } from "@/domain/usecases/IGetProjects";
import type { IGetSkills } from "@/domain/usecases/IGetSkills";
import type { IGetTimeline } from "@/domain/usecases/IGetTimeline";
import type { ISendContactMessage } from "@/domain/usecases/ISendContactMessage";

import { GetPersonalInfo } from "@/application/usecases/GetPersonalInfo";
import { GetProjects } from "@/application/usecases/GetProjects";
import { GetSkills } from "@/application/usecases/GetSkills";
import { GetTimeline } from "@/application/usecases/GetTimeline";
import { SendContactMessage } from "@/application/usecases/SendContactMessage";

import { StaticPersonalInfoRepository } from "../repositories/StaticPersonalInfoRepository";
import { StaticProjectRepository } from "../repositories/StaticProjectRepository";
import { StaticSkillRepository } from "../repositories/StaticSkillRepository";
import { StaticTimelineRepository } from "../repositories/StaticTimelineRepository";
import { LocalContactRepository } from "../repositories/LocalContactRepository";

export interface AppContainer {
  readonly getPersonalInfo: IGetPersonalInfo;
  readonly getProjects: IGetProjects;
  readonly getSkills: IGetSkills;
  readonly getTimeline: IGetTimeline;
  readonly sendContactMessage: ISendContactMessage;
}

export function createContainer(): AppContainer {
  const personalInfoRepo = new StaticPersonalInfoRepository();
  const projectRepo = new StaticProjectRepository();
  const skillRepo = new StaticSkillRepository();
  const timelineRepo = new StaticTimelineRepository();
  const contactRepo = new LocalContactRepository();

  return {
    getPersonalInfo: new GetPersonalInfo(personalInfoRepo),
    getProjects: new GetProjects(projectRepo),
    getSkills: new GetSkills(skillRepo),
    getTimeline: new GetTimeline(timelineRepo),
    sendContactMessage: new SendContactMessage(contactRepo),
  };
}
