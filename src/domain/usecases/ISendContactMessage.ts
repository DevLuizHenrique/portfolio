import type { ContactMessage, ContactResult } from "../entities/ContactMessage";

export interface ISendContactMessage {
  execute(message: ContactMessage): Promise<ContactResult>;
}
