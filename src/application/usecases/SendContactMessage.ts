import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import { validateContactMessage } from "@/domain/entities/ContactMessage";
import type { IContactMessageGateway } from "@/domain/gateways/IContactMessageGateway";
import type { ISendContactMessage } from "@/domain/usecases/ISendContactMessage";

export class SendContactMessage implements ISendContactMessage {
  constructor(private readonly gateway: IContactMessageGateway) {}

  async execute(message: ContactMessage): Promise<ContactResult> {
    const validationError = validateContactMessage(message);
    if (validationError) return validationError;

    return this.gateway.send(message);
  }
}
