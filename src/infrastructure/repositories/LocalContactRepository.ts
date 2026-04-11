import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";

export class LocalContactRepository implements IContactRepository {
  async send(message: ContactMessage): Promise<ContactResult> {
    // Simula envio — substituir por integração real (e.g. Resend, SendGrid)
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!message.name || !message.email || !message.message) {
      return { success: false, error: "Todos os campos são obrigatórios." };
    }

    console.log("[Contact] Mensagem recebida:", message);
    return { success: true };
  }
}
