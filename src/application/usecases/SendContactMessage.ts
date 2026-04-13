import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import { validateContactMessage } from "@/domain/entities/ContactMessage";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";
import type { ISendContactMessage } from "@/domain/usecases/ISendContactMessage";

export class SendContactMessage implements ISendContactMessage {
  constructor(private readonly repository: IContactRepository) {}

  async execute(message: ContactMessage): Promise<ContactResult> {
    const validationError = validateContactMessage(message);
    if (validationError) return validationError;

    return this.repository.send(message);
  }
}
