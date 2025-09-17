import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Javanese calendar fundamentals (Neptu values)
// Source: provided mapping from user
export type JavaneseDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu"
export type Pasaran = "Kliwon" | "Legi" | "Pahing" | "Pon" | "Wage"

export const JAVANESE_DAYS: readonly JavaneseDay[] = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
] as const

export const PASARANS: readonly Pasaran[] = [
  "Kliwon",
  "Legi",
  "Pahing",
  "Pon",
  "Wage",
] as const

export const DAY_NEPTU: Readonly<Record<JavaneseDay, number>> = {
  Senin: 4,
  Selasa: 3,
  Rabu: 7,
  Kamis: 8,
  Jumat: 6,
  Sabtu: 9,
  Minggu: 5,
} as const

export const PASARAN_NEPTU: Readonly<Record<Pasaran, number>> = {
  Kliwon: 8,
  Legi: 5,
  Pahing: 9,
  Pon: 7,
  Wage: 4,
} as const

// Helper lookups with flexible casing/spacing
const DAY_NEPTU_LOWER: Readonly<Record<string, number>> = Object.fromEntries(
  Object.entries(DAY_NEPTU).map(([k, v]) => [k.toLowerCase(), v])
)

const PASARAN_NEPTU_LOWER: Readonly<Record<string, number>> = Object.fromEntries(
  Object.entries(PASARAN_NEPTU).map(([k, v]) => [k.toLowerCase(), v])
)

export function getDayNeptu(day: string | JavaneseDay): number | undefined {
  const key = String(day).trim().toLowerCase()
  return DAY_NEPTU_LOWER[key]
}

export function getPasaranNeptu(pasaran: string | Pasaran): number | undefined {
  const key = String(pasaran).trim().toLowerCase()
  return PASARAN_NEPTU_LOWER[key]
}