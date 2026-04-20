import type { PersonalInfo } from "@/domain/entities/PersonalInfo";
import type { IPersonalInfoRepository } from "@/domain/repositories/IPersonalInfoRepository";

const PERSONAL_INFO: PersonalInfo = {
  name: "Luiz Henrique Ferreira",
  role: "Desenvolvedor Frontend / Full Stack Pleno",
  bio: [
    "Sou desenvolvedor Pleno com foco em Frontend e atuação Full Stack, construindo aplicações web com React, Next.js, JavaScript e TypeScript para produtos reais e ambientes corporativos.",
    "Minha experiência recente inclui o desenvolvimento de um sistema interno para digitação de documentos com fins de faturamento hospitalar, contribuindo para um ganho real de mais de 87% de produtividade no fluxo operacional.",
    "Tenho perfil orientado a produto, usabilidade e organização de código, além de seguir ampliando minha atuação full stack com estudos e projetos em Go (Golang).",
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/DevLuizHenrique" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/luiz-henrique-ferreira-229b87263",
    },
    { label: "Currículo", href: "/curriculo.html" },
  ],
  stats: [
    { value: "Pleno", label: "Atuação\nAtual" },
    { value: "+87%", label: "Ganho de\nProdutividade" },
    { value: "React / Next.js", label: "Foco\nPrincipal" },
  ],
  contactChannels: [
    {
      icon: "✉",
      label: "E-mail",
      value: "lhpf95@gmail.com",
      href: "mailto:lhpf95@gmail.com",
    },
    {
      icon: "☎",
      label: "WhatsApp",
      value: "(46) 99139-7534",
      href: "https://wa.me/5546991397534",
    },
    {
      icon: "⚡",
      label: "GitHub",
      value: "github.com/DevLuizHenrique",
      href: "https://github.com/DevLuizHenrique",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/luiz-henrique-ferreira-229b87263",
      href: "https://www.linkedin.com/in/luiz-henrique-ferreira-229b87263",
    },
  ],
};

export class StaticPersonalInfoRepository implements IPersonalInfoRepository {
  async get(): Promise<PersonalInfo> {
    return PERSONAL_INFO;
  }
}
