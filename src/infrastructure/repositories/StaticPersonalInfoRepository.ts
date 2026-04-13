import type { PersonalInfo } from "@/domain/entities/PersonalInfo";
import type { IPersonalInfoRepository } from "@/domain/repositories/IPersonalInfoRepository";

const PERSONAL_INFO: PersonalInfo = {
  name: "Luiz Henrique",
  role: "Desenvolvedor Full Stack",
  bio: [
    "Sou um desenvolvedor full stack apaixonado por transformar ideias complexas em experiências digitais elegantes. Meu trabalho é encontrar o caminho mais claro entre o problema e a solução.",
    "Com anos de experiência em front-end e back-end, construo aplicações que não apenas funcionam — mas que encantam quem as usa. Cada projeto é uma oportunidade de criar algo que faz a diferença.",
    "Quando não estou codificando, estou explorando novas tecnologias, contribuindo para projetos open source ou compartilhando conhecimento com a comunidade dev.",
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/DevLuizHenrique" },
    { label: "LinkedIn", href: "www.linkedin.com/in/luiz-henrique-ferreira-229b87263" },
    { label: "Currículo", href: "/curriculo.html" },
  ],
  stats: [
    { value: "5+", label: "Anos de\nExperiência" },
    { value: "30+", label: "Projetos\nEntregues" },
    { value: "10+", label: "Tecnologias\nDominadas" },
  ],
  contactChannels: [
    { icon: "✉", label: "E-mail", value: "luiz@exemplo.com", href: "mailto:luiz@exemplo.com" },
    { icon: "⚡", label: "GitHub", value: "github.com/DevLuizHenrique", href: "https://github.com/DevLuizHenrique" },
    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/luizhenrique", href: "https://www.linkedin.com/in/luiz-henrique-ferreira-229b87263" },
  ],
};

export class StaticPersonalInfoRepository implements IPersonalInfoRepository {
  async get(): Promise<PersonalInfo> {
    return PERSONAL_INFO;
  }
}
