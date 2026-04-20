import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";
import type { IContactMessageGateway } from "@/domain/gateways/IContactMessageGateway";

interface ResendContactGatewayOptions {
  readonly apiKey: string;
  readonly fromEmail: string;
  readonly toEmail: string;
}

export class ResendContactGateway implements IContactMessageGateway {
  constructor(private readonly options: ResendContactGatewayOptions) {}

  async send(message: ContactMessage): Promise<ContactResult> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.options.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: this.options.fromEmail,
          to: [this.options.toEmail],
          reply_to: message.email,
          subject: `Novo contato do portfólio - ${message.name}`,
          text: [
            `Nome: ${message.name}`,
            `E-mail: ${message.email}`,
            "",
            message.message,
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        return {
          success: false,
          code: "delivery_failed",
          error: "Não foi possível enviar sua mensagem agora.",
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
