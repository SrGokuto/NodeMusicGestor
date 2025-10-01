import { Cancion } from "./Cancion";

enum Estado {
  Reproduciendo = "Reproduciendo",
  Pausado = "Pausado",
  Detenido = "Detenido"
}

 export class Reproductor {
  estado: Estado;
  colaReproduccion: Cancion[];
  volumen: number;
  velocidadReproduccion: number;

  constructor() {
    this.estado = Estado.Detenido;
    this.colaReproduccion = [];
    this.volumen = 50;
    this.velocidadReproduccion = 1;
  }

  controlar(segundos: number): void {
    console.log(`Controlando reproducción por ${segundos} segundos`);
  }

  pausar(): void {
    this.estado = Estado.Pausado;
  }

  reproducir(cancion: Cancion): void {
    this.estado = Estado.Reproduciendo;
    this.colaReproduccion.unshift(cancion);
  }

  detener(): void {
    this.estado = Estado.Detenido;
  }

  siguiente(): void {
    this.colaReproduccion.shift();
  }

  anterior(): void {
    console.log("Volviendo a la canción anterior (no implementado)");
  }

  cambiarVelocidad(): void {
    console.log("Cambiando velocidad (no implementado)");
  }
}
