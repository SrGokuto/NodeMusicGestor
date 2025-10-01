export type Suscripcion = "gratuita" | "premium" | "familiar";

export const Suscripcion = {
  GRATUITA: "gratuita" as const,
  PREMIUM: "premium" as const,
  FAMILIAR: "familiar" as const,
} as const;