"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import { usePersonalInfo } from "@/presentation/hooks/usePersonalInfo";
import { useContactForm } from "@/presentation/hooks/useContactForm";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const hookInfo = usePersonalInfo();
  const info = hookInfo;
  const { state, send } = useContactForm();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const visible = isInView || !!info;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); send(form); };

  const input = "w-full bg-transparent border-b border-[var(--border)] py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--dim)] outline-none focus:border-[var(--accent)] transition-colors";

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle number="04" title="Contato" subtitle="Vamos conversar" />

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <div className="space-y-3">
              {info ? (
                info.contactChannels.map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-[var(--dim)] hover:text-[var(--accent)] transition-colors">
                    {c.value}
                  </a>
                ))
              ) : (
                <div aria-hidden className="space-y-3">
                  <div className="h-4 bg-[var(--border)] w-3/4 rounded animate-pulse" />
                  <div className="h-4 bg-[var(--border)] w-2/3 rounded" />
                  <div className="h-4 bg-[var(--border)] w-1/2 rounded" />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
            {state === "success" ? (
              <p className="text-sm text-[var(--muted)]">Enviado. Obrigado.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" className={input} required />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className={input} required />
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Mensagem" rows={3} className={`${input} resize-none`} required />
                <button type="submit" disabled={state === "sending"} className="text-xs text-[var(--accent)] hover:opacity-70 transition-opacity disabled:opacity-30">
                  {state === "sending" ? "..." : "Enviar \u2192"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
