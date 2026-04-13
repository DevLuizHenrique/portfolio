"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/domain/entities/Project";
import { useContainer } from "../providers/ContainerProvider";

interface ProjectsState {
  featured: Project[];
  notFeatured: Project[];
  all: Project[];
}

export function useProjects() {
  const { getProjects } = useContainer();
  const [data, setData] = useState<ProjectsState>({ featured: [], notFeatured: [], all: [] });

  useEffect(() => {
    Promise.all([
      getProjects.featured(),
      getProjects.notFeatured(),
      getProjects.all(),
    ]).then(([featured, notFeatured, all]) => setData({ featured, notFeatured, all }));
  }, [getProjects]);

  return data;
}
