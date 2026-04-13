import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";

export class LocalContactRepository implements IContactRepository {
  async send(message: ContactMessage): Promise<ContactResult> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("[Contact] Mensagem recebida:", message);
    return { success: true };
  }
}
