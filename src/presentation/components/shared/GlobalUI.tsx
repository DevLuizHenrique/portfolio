"use client";

import React, { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Search, Home, User, Code, Folder, Mail, Link, ExternalLink, FileText } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface CommandItem {
  readonly id: string;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly href: string;
  readonly external?: boolean;
}

declare global {
  interface Window {
    showToast?: (message: string, type?: ToastType) => void;
  }
}

export default function GlobalUI() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);

    return () => {
      window.clearTimeout(timer);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => window.removeEventListener("keydown", trapFocus);
  }, [open]);

  useEffect(() => {
    window.showToast = (message: string, type: ToastType = "success") => {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      const colorMap: Record<string, string> = { success: "text-emerald-400", error: "text-red-400", info: "text-sky-400" };
      const marker = document.createElement("div");
      const text = document.createElement("span");

      toast.className = "toast flex items-center gap-3 px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl max-w-sm";
      marker.className = `${colorMap[type]} text-lg`;
      marker.textContent = "•";
      text.className = "text-sm text-[var(--foreground)]";
      text.textContent = message;
      toast.appendChild(marker);
      toast.appendChild(text);

      container.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add("show"));

      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    };
  }, []);

  const items: CommandItem[] = [
    { id: "hero", label: "Início", href: "#hero", icon: Home },
    { id: "about", label: "Sobre", href: "#about", icon: User },
    { id: "skills", label: "Skills", href: "#skills", icon: Code },
    { id: "projects", label: "Projetos", href: "#projects", icon: Folder },
    { id: "contact", label: "Contato", href: "#contact", icon: Mail },
    { id: "resume", label: "Currículo ATS", href: "/curriculo.html", icon: FileText, external: true },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/luiz-henrique-ferreira-229b87263", icon: Link, external: true },
    { id: "github", label: "GitHub", href: "https://github.com/DevLuizHenrique", icon: ExternalLink, external: true },
  ];

  const filtered = items.filter((it) => it.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div id="toast-container" className="fixed top-6 right-6 z-[100] flex flex-col gap-3" aria-live="polite" aria-atomic="true" />

      <div className={`${open ? "" : "hidden"} fixed inset-0 z-[90]`} aria-hidden={!open}>
        <button type="button" className="cmd-backdrop absolute inset-0" onClick={() => setOpen(false)} aria-label="Fechar busca" />
        <div ref={dialogRef} className="relative z-10 mx-auto mt-[20vh] w-full max-w-lg" role="dialog" aria-modal="true" aria-labelledby="command-palette-title">
          <div className="bg-[rgba(6,6,15,0.95)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden">
            <h2 id="command-palette-title" className="sr-only">
              Busca rápida no portfólio
            </h2>
            <div className="flex items-center border-b border-[var(--border)] px-4">
              <Search size={16} className="text-[var(--dim)] mr-3" />
              <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no portfólio..." aria-label="Buscar no portfólio" className="w-full bg-transparent py-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--dim)]" />
              <kbd className="ml-2 px-2 py-0.5 text-[10px] text-[var(--dim)] bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded font-mono">ESC</kbd>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.map((it) => {
                const Icon = it.icon;
                return (
                  <a
                    key={it.id}
                    href={it.href}
                    target={it.external ? "_blank" : undefined}
                    rel={it.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="cmd-item w-full text-left px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.02)] flex items-center gap-3 text-sm text-[var(--muted)] transition-colors"
                  >
                    <Icon size={14} className="text-[var(--dim)]" />
                    {it.label}
                  </a>
                );
              })}

              {filtered.length === 0 && <div className="px-3 py-2 text-sm text-[var(--dim)]">Nenhum resultado</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
