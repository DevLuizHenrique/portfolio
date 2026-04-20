import type { ContactMessage, ContactResult } from "../entities/ContactMessage";

export interface IContactMessageGateway {
  send(message: ContactMessage): Promise<ContactResult>;
}
