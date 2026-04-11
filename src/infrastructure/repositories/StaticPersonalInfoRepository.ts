import type { PersonalInfo } from "@/domain/entities/PersonalInfo";
import type { IPersonalInfoRepository } from "@/domain/repositories/IPersonalInfoRepository";

const PERSONAL_INFO: PersonalInfo = {
  name: "Luiz Henrique",
  role: "Desenvolvedor Full Stack",
  bio: [
    "Sou um desenvolvedor full stack apaixonado pela arte de transformar ideias complexas em experiências digitais elegantes. Como um cartógrafo traçando mapas de territórios inexplorados, meu trabalho é encontrar o caminho mais claro entre o problema e a solução.",
    "Com anos de experiência navegando os reinos do front-end e back-end, construo aplicações que não apenas funcionam — mas que encantam quem as usa. Cada linha de código é uma passagem secreta esperando ser descoberta.",
    "Quando não estou codificando, estou explorando novas tecnologias, contribuindo para projetos open source ou ensinando outros a descobrirem sua própria magia no desenvolvimento.",
  ],
  socialLinks: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Email", href: "#contact" },
  ],
  stats: [
    { value: "5+", label: "Anos de\nExperiência" },
    { value: "30+", label: "Projetos\nEntregues" },
    { value: "10+", label: "Tecnologias\nDominadas" },
  ],
  contactChannels: [
    {
      icon: "✉",
      label: "Pombo-Correio",
      value: "luiz@exemplo.com",
      href: "mailto:luiz@exemplo.com",
    },
    {
      icon: "⚡",
      label: "Floo Network",
      value: "github.com/luizhenrique",
      href: "#",
    },
    {
      icon: "🔮",
      label: "Espelho de Ojesed",
      value: "linkedin.com/in/luizhenrique",
      href: "#",
    },
  ],
};

export class StaticPersonalInfoRepository implements IPersonalInfoRepository {
  get(): PersonalInfo {
    return PERSONAL_INFO;
  }
}
