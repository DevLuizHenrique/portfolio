"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { ContactChannel } from "@/domain/entities/PersonalInfo";
import SectionTitle from "../shared/SectionTitle";
import { useContactForm } from "@/presentation/hooks/useContactForm";

interface ContactSectionProps {
  readonly channels: readonly ContactChannel[];
}

export default function ContactSection({ channels }: ContactSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { state, error, send } = useContactForm();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const visible = isInView;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(form);
  };

  const input =
    "w-full bg-transparent border-b border-[var(--border)] py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--dim)] outline-none focus:border-[var(--accent)] transition-colors";

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Contato" subtitle="Vamos conversar" />

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[var(--dim)] hover:text-[var(--accent)] transition-colors"
                >
                  {c.value}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {state === "success" ? (
              <p
                className="text-sm text-emerald-300"
                role="status"
                aria-live="polite"
              >
                Mensagem enviada com sucesso.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nome"
                    className={input}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="E-mail"
                    className={input}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Mensagem"
                    rows={3}
                    className={`${input} resize-none`}
                    required
                  />
                </div>
                {error ? (
                  <p
                    className="text-sm text-red-300"
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="text-xs text-[var(--accent)] hover:opacity-70 transition-opacity disabled:opacity-30"
                >
                  {state === "sending" ? "..." : "Enviar \u2192"}
                </button>
                <p className="text-xs text-[var(--dim)]">
                  Se o formulário estiver indisponível, use os links diretos ao
                  lado.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
