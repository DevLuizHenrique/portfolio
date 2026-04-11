import type { TimelineEvent } from "@/domain/entities/TimelineEvent";
import type { ITimelineRepository } from "@/domain/repositories/ITimelineRepository";

export class GetTimeline {
  constructor(private readonly repository: ITimelineRepository) {}

  all(): TimelineEvent[] {
    return this.repository.getAll();
  }
}
