"use client";

import { useState, useCallback } from "react";
import type { ContactMessage } from "@/domain/entities/ContactMessage";
import { useContainer } from "../providers/ContainerProvider";

type FormState = "idle" | "sending" | "success" | "error";

export function useContactForm() {
  const { sendContactMessage } = useContainer();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>();

  const send = useCallback(
    async (message: ContactMessage) => {
      setState("sending");
      setError(undefined);

      const result = await sendContactMessage.execute(message);

      if (result.success) {
        setState("success");
      } else {
        setState("error");
        setError(result.error);
      }
    },
    [sendContactMessage],
  );

  return { state, error, send };
}
