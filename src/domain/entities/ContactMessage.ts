export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface ContactResult {
  readonly success: boolean;
  readonly error?: string;
}

export function validateContactMessage(msg: ContactMessage): ContactResult | null {
  if (!msg.name.trim()) return { success: false, error: "Nome é obrigatório." };
  if (!msg.email.trim()) return { success: false, error: "E-mail é obrigatório." };
  if (!msg.message.trim()) return { success: false, error: "Mensagem é obrigatória." };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(msg.email)) return { success: false, error: "E-mail inválido." };

  return null;
}
