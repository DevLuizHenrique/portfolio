import type { TimelineEvent } from "../entities/TimelineEvent";

export interface ITimelineRepository {
  getAll(): Promise<TimelineEvent[]>;
}
