import { execSync } from "child_process";

export function obtenerDuracionFFmpeg(rutaVideo: string): number {
  try {
    const output = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${rutaVideo}"`,
      { encoding: "utf8" }
    ).trim();

    const segundos = parseFloat(output);
    if (isNaN(segundos)) throw new Error("No se pudo obtener la duración");

    return segundos;
  } catch (err) {
    console.error("Error obteniendo duración:", err);
    return 0;
  }
}
