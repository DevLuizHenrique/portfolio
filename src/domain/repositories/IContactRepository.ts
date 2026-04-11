import type { ContactMessage, ContactResult } from "../entities/ContactMessage";

export interface IContactRepository {
  send(message: ContactMessage): Promise<ContactResult>;
}
