"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type AppContainer, createContainer } from "@/infrastructure/di/container";

const ContainerContext = createContext<AppContainer | null>(null);

const defaultContainer = createContainer();

export function ContainerProvider({ children }: { children: ReactNode }) {
  return (
    <ContainerContext.Provider value={defaultContainer}>
      {children}
    </ContainerContext.Provider>
  );
}

export function useContainer(): AppContainer {
  const container = useContext(ContainerContext);
  if (!container) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return container;
}
