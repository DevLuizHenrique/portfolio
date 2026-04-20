"use client";

import { useState, useCallback } from "react";
import type { ContactMessage, ContactResult } from "@/domain/entities/ContactMessage";

type FormState = "idle" | "sending" | "success" | "error";

export function useContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>();

  const send = useCallback(
    async (message: ContactMessage) => {
      setState("sending");
      setError(undefined);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
        const result: ContactResult = await response.json();

        if (!response.ok || !result.success) {
          setState("error");
          setError(result.error ?? "Não foi possível enviar sua mensagem agora.");
          return;
        }

        setState("success");
      } catch {
        setState("error");
        setError("Não foi possível enviar sua mensagem agora.");
      }
    },
    [],
  );

  return { state, error, send };
}
