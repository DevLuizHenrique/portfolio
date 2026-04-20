import type { ExtraSkill, SkillGroup } from "@/domain/entities/Skill";
import type { ISkillRepository } from "@/domain/repositories/ISkillRepository";

const SKILL_GROUPS: SkillGroup[] = [
  {
    chamber: "Front-End",
    icon: "⬡",
    skills: [
      { name: "React / Next.js", level: 92, rune: "R" },
      { name: "JavaScript (ES6+)", level: 90, rune: "J" },
      { name: "TypeScript", level: 88, rune: "T" },
      { name: "Tailwind CSS", level: 90, rune: "W" },
      { name: "TanStack Query", level: 75, rune: "Q" },
    ],
  },
  {
    chamber: "Back-End",
    icon: "⬢",
    skills: [
      { name: "Node.js", level: 80, rune: "N" },
      { name: "TypeScript (Backend)", level: 85, rune: "T" },
      { name: "PostgreSQL", level: 85, rune: "D" },
      { name: "REST / GraphQL", level: 82, rune: "G" },
      { name: "Go (Golang)", level: 75, rune: "G" },
    ],
  },
  {
    chamber: "Ferramentas",
    icon: "⬟",
    skills: [
      { name: "Git / GitHub", level: 94, rune: "G" },
      { name: "CI/CD", level: 70, rune: "C" },
      { name: "Docker", level: 70, rune: "K" },
      { name: "Figma / Design", level: 72, rune: "F" },
      { name: "Testes (Jest / Vitest)", level: 80, rune: "J" },
    ],
  },
];

const EXTRA_SKILLS: ExtraSkill[] = [
  { name: "Clean Architecture" },
  { name: "Performance Optimization" },
  { name: "MongoDB" },
  { name: "Prisma" },
  { name: "Zod" },
  { name: "Vite" },
  { name: "Vercel" },
  { name: "Linux" },
  { name: "Bash" },
];

export class StaticSkillRepository implements ISkillRepository {
  async getGroups(): Promise<SkillGroup[]> {
    return SKILL_GROUPS;
  }

  async getExtras(): Promise<ExtraSkill[]> {
    return EXTRA_SKILLS;
  }
}
