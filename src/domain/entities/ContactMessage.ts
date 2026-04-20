export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export type ContactErrorCode =
  | "validation_error"
  | "delivery_failed"
  | "delivery_unavailable";

export interface ContactResult {
  readonly success: boolean;
  readonly code?: ContactErrorCode;
  readonly error?: string;
}

export function isContactMessage(value: unknown): value is ContactMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.message === "string"
  );
}

export function validateContactMessage(msg: ContactMessage): ContactResult | null {
  if (!msg.name.trim()) {
    return {
      success: false,
      code: "validation_error",
      error: "Nome é obrigatório.",
    };
  }

  if (!msg.email.trim()) {
    return {
      success: false,
      code: "validation_error",
      error: "E-mail é obrigatório.",
    };
  }

  if (!msg.message.trim()) {
    return {
      success: false,
      code: "validation_error",
      error: "Mensagem é obrigatória.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(msg.email)) {
    return {
      success: false,
      code: "validation_error",
      error: "E-mail inválido.",
    };
  }

  return null;
}
