import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";

export class SendContactMessage {
  constructor(private readonly repository: IContactRepository) {}

  async execute(message: ContactMessage): Promise<ContactResult> {
    return this.repository.send(message);
  }
}
