import type { ContactResult } from "@/domain/entities/ContactMessage";
import type { IContactMessageGateway } from "@/domain/gateways/IContactMessageGateway";

export class UnavailableContactGateway implements IContactMessageGateway {
  async send(): Promise<ContactResult> {
    return {
      success: false,
      code: "delivery_unavailable",
      error:
        "O formulário está indisponível agora. Use e-mail, WhatsApp ou LinkedIn nos links de contato.",
    };
  }
}
