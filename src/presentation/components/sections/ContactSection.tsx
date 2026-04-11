"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import CornerOrnaments from "../shared/CornerOrnaments";
import { usePersonalInfo } from "@/presentation/hooks/usePersonalInfo";
import { useContactForm } from "@/presentation/hooks/useContactForm";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  backgroundColor: "rgba(240, 230, 200, 0.6)",
  border: "1px solid rgba(139, 105, 20, 0.5)",
  borderRadius: 0,
  fontFamily: "IM Fell English, Georgia, serif",
  fontSize: "0.95rem",
  color: "#2c1810",
  outline: "none",
  transition: "border-color 0.2s",
};

function ContactInfo() {
  const info = usePersonalInfo();

  return (
    <div className="map-card p-8 h-full">
      <CornerOrnaments />

      <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "Cinzel, serif", color: "#2c1810" }}>
        Localização no Mapa
      </h3>

      <div className="mb-8 p-4" style={{ border: "1px dashed rgba(139,105,20,0.4)" }}>
        <svg viewBox="0 0 200 150" className="w-full opacity-60">
          <rect x="10" y="10" width="180" height="130" fill="none" stroke="#8b6914" strokeWidth="1" />
          <rect x="70" y="40" width="60" height="50" fill="none" stroke="#5c3317" strokeWidth="1.5" />
          <text x="100" y="70" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="#5c3317">Torre dos</text>
          <text x="100" y="80" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="#5c3317">Corvos</text>
          <line x1="95" y1="55" x2="105" y2="65" stroke="#c9a227" strokeWidth="1.5" />
          <line x1="105" y1="55" x2="95" y2="65" stroke="#c9a227" strokeWidth="1.5" />
          <path d="M 10 100 Q 50 80 70 90 Q 90 95 100 90" fill="none" stroke="#8b6914" strokeWidth="0.8" strokeDasharray="4 3" />
          <path d="M 190 90 Q 160 85 140 88 Q 125 91 130 90" fill="none" stroke="#8b6914" strokeWidth="0.8" strokeDasharray="4 3" />
          <text x="100" y="135" textAnchor="middle" fontFamily="IM Fell English, serif" fontSize="8" fill="#704214" fontStyle="italic">Você está aqui</text>
        </svg>
      </div>

      <div className="space-y-6">
        {info.contactChannels.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <span className="text-xl mt-0.5">{item.icon}</span>
            <div>
              <div className="text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
                {item.label}
              </div>
              <a
                href={item.href}
                className="text-sm transition-colors hover:!text-[#c9a227]"
                style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#3d2010" }}
              >
                {item.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const { state, send } = useContactForm();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(form);
  };

  if (state === "success") {
    return (
      <div className="map-card p-8">
        <CornerOrnaments />
        <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-5xl mb-6">🦉</div>
          <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Cinzel, serif", color: "#2c1810" }}>
            Mensagem Enviada!
          </h3>
          <p className="italic" style={{ fontFamily: "IM Fell English, serif", color: "#5c3317" }}>
            Sua coruja partiu pelos céus. Responderei em breve, com tinta especial e pergaminho fresco.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="map-card p-8">
      <CornerOrnaments />
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "Cinzel, serif", color: "#2c1810" }}>
          Escreva sua Mensagem
        </h3>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
            Seu Nome
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Como devo chamá-lo?"
            style={INPUT_STYLE}
            required
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
            Pombo-Correio (E-mail)
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="seu@email.com"
            style={INPUT_STYLE}
            required
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
            Sua Mensagem
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Escreva sua mensagem em pergaminho..."
            rows={5}
            style={{ ...INPUT_STYLE, resize: "vertical" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(92,51,23,0.4)] disabled:opacity-50"
          style={{ fontFamily: "Cinzel, serif", backgroundColor: "#5c3317", color: "#f5edd5", border: "1px solid #5c3317" }}
        >
          {state === "sending" ? "Enviando..." : "Enviar Coruja"}
        </button>
      </form>
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      className="py-24 px-6"
      ref={ref}
      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(92,51,23,0.04) 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionTitle number="IV" title="Torre dos Corvos" subtitle="Envie uma Mensagem pelos Céus" />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
