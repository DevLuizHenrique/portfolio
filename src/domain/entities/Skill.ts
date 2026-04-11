export interface Skill {
  readonly name: string;
  readonly level: number;
  readonly rune: string;
}

export interface SkillGroup {
  readonly chamber: string;
  readonly icon: string;
  readonly skills: readonly Skill[];
}

export interface ExtraSkill {
  readonly name: string;
}
