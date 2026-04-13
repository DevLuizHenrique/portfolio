import type { TimelineEvent } from "@/domain/entities/TimelineEvent";
import type { ITimelineRepository } from "@/domain/repositories/ITimelineRepository";
import type { IGetTimeline } from "@/domain/usecases/IGetTimeline";

export class GetTimeline implements IGetTimeline {
  constructor(private readonly repository: ITimelineRepository) {}

  async all(): Promise<TimelineEvent[]> {
    return this.repository.getAll();
  }
}
