"use client";

import { useEffect, useState } from "react";
import type { PersonalInfo } from "@/domain/entities/PersonalInfo";
import { useContainer } from "../providers/ContainerProvider";

export function usePersonalInfo() {
  const { getPersonalInfo } = useContainer();
  const [data, setData] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    getPersonalInfo.execute().then(setData);
  }, [getPersonalInfo]);

  return data;
}
