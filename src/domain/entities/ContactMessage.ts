export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface ContactResult {
  readonly success: boolean;
  readonly error?: string;
}
