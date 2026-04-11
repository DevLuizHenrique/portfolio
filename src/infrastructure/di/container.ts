import { GetProjects } from "@/application/usecases/GetProjects";
import { GetSkills } from "@/application/usecases/GetSkills";
import { GetTimeline } from "@/application/usecases/GetTimeline";
import { GetPersonalInfo } from "@/application/usecases/GetPersonalInfo";
import { SendContactMessage } from "@/application/usecases/SendContactMessage";
import { StaticProjectRepository } from "../repositories/StaticProjectRepository";
import { StaticSkillRepository } from "../repositories/StaticSkillRepository";
import { StaticTimelineRepository } from "../repositories/StaticTimelineRepository";
import { StaticPersonalInfoRepository } from "../repositories/StaticPersonalInfoRepository";
import { LocalContactRepository } from "../repositories/LocalContactRepository";

export interface AppContainer {
  getProjects: GetProjects;
  getSkills: GetSkills;
  getTimeline: GetTimeline;
  getPersonalInfo: GetPersonalInfo;
  sendContactMessage: SendContactMessage;
}

export function createContainer(): AppContainer {
  const projectRepo = new StaticProjectRepository();
  const skillRepo = new StaticSkillRepository();
  const timelineRepo = new StaticTimelineRepository();
  const personalInfoRepo = new StaticPersonalInfoRepository();
  const contactRepo = new LocalContactRepository();

  return {
    getProjects: new GetProjects(projectRepo),
    getSkills: new GetSkills(skillRepo),
    getTimeline: new GetTimeline(timelineRepo),
    getPersonalInfo: new GetPersonalInfo(personalInfoRepo),
    sendContactMessage: new SendContactMessage(contactRepo),
  };
}
