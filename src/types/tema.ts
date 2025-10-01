
export type Tema = "morado" | "verde" | "azul" | "cian";

export const Tema = {
  MORADO: "morado" as const,
  VERDE: "verde" as const,
  AZUL: "azul" as const,
  CIAN: "cian" as const,
} as const;