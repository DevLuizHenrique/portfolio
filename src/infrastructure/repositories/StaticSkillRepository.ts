import type { ExtraSkill, SkillGroup } from "@/domain/entities/Skill";
import type { ISkillRepository } from "@/domain/repositories/ISkillRepository";

const SKILL_GROUPS: SkillGroup[] = [
  {
    chamber: "Front-End",
    icon: "⬡",
    skills: [
      { name: "React / Next.js", level: 92, rune: "R" },
      { name: "TypeScript", level: 88, rune: "T" },
      { name: "Tailwind CSS", level: 90, rune: "W" },
      { name: "Framer Motion", level: 78, rune: "M" },
      { name: "Vue.js", level: 72, rune: "V" },
    ],
  },
  {
    chamber: "Back-End",
    icon: "⬢",
    skills: [
      { name: "Node.js", level: 88, rune: "N" },
      { name: "Python", level: 80, rune: "P" },
      { name: "PostgreSQL", level: 85, rune: "D" },
      { name: "REST / GraphQL", level: 82, rune: "G" },
      { name: "Docker", level: 75, rune: "K" },
    ],
  },
  {
    chamber: "Ferramentas",
    icon: "⬟",
    skills: [
      { name: "Git / GitHub", level: 94, rune: "G" },
      { name: "CI/CD", level: 78, rune: "C" },
      { name: "AWS / Cloud", level: 70, rune: "A" },
      { name: "Figma / Design", level: 74, rune: "F" },
      { name: "Testes (Jest / Vitest)", level: 80, rune: "J" },
    ],
  },
];

const EXTRA_SKILLS: ExtraSkill[] = [
  { name: "Redis" }, { name: "MongoDB" }, { name: "Prisma" }, { name: "tRPC" },
  { name: "Zod" }, { name: "Storybook" }, { name: "Webpack" }, { name: "Vite" },
  { name: "Nx" }, { name: "Vercel" }, { name: "Linux" }, { name: "Bash" },
];

export class StaticSkillRepository implements ISkillRepository {
  async getGroups(): Promise<SkillGroup[]> {
    return SKILL_GROUPS;
  }

  async getExtras(): Promise<ExtraSkill[]> {
    return EXTRA_SKILLS;
  }
}
