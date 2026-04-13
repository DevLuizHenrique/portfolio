import type { TimelineEvent } from "../entities/TimelineEvent";

export interface IGetTimeline {
  all(): Promise<TimelineEvent[]>;
}
