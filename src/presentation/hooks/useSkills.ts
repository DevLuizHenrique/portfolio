"use client";

import { useEffect, useState } from "react";
import type { ExtraSkill, SkillGroup } from "@/domain/entities/Skill";
import { useContainer } from "../providers/ContainerProvider";

interface SkillsState {
  groups: SkillGroup[];
  extras: ExtraSkill[];
}

export function useSkills() {
  const { getSkills } = useContainer();
  const [data, setData] = useState<SkillsState>({ groups: [], extras: [] });

  useEffect(() => {
    Promise.all([getSkills.groups(), getSkills.extras()])
      .then(([groups, extras]) => setData({ groups, extras }));
  }, [getSkills]);

  return data;
}
