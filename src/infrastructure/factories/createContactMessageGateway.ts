import type { IContactMessageGateway } from "@/domain/gateways/IContactMessageGateway";
import { ResendContactGateway } from "../gateways/ResendContactGateway";
import { UnavailableContactGateway } from "../gateways/UnavailableContactGateway";
import { WebhookContactGateway } from "../gateways/WebhookContactGateway";

export function createContactMessageGateway(): IContactMessageGateway {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    return new WebhookContactGateway({ url: webhookUrl });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.CONTACT_FROM_EMAIL;
  const resendToEmail = process.env.CONTACT_TO_EMAIL;

  if (resendApiKey && resendFromEmail && resendToEmail) {
    return new ResendContactGateway({
      apiKey: resendApiKey,
      fromEmail: resendFromEmail,
      toEmail: resendToEmail,
    });
  }

  return new UnavailableContactGateway();
}
