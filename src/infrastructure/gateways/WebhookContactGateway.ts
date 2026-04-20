import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import type { IContactMessageGateway } from "@/domain/gateways/IContactMessageGateway";

interface WebhookContactGatewayOptions {
  readonly url: string;
}

export class WebhookContactGateway implements IContactMessageGateway {
  constructor(private readonly options: WebhookContactGatewayOptions) {}

  async send(message: ContactMessage): Promise<ContactResult> {
    try {
      const response = await fetch(this.options.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        return {
          success: false,
          code: "delivery_failed",
          error: "Não foi possível encaminhar sua mensagem agora.",
        };
      }

      return { success: true };
    } catch {
      return {
        success: false,
        code: "delivery_failed",
        error: "O serviço de contato está indisponível no momento.",
      };
    }
  }
}
