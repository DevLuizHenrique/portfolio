"use client";

import { useMemo } from "react";
import { useContainer } from "../providers/ContainerProvider";

export function useProjects() {
  const { getProjects } = useContainer();

  return useMemo(
    () => ({
      featured: getProjects.featured(),
      notFeatured: getProjects.notFeatured(),
      all: getProjects.all(),
    }),
    [getProjects],
  );
}
