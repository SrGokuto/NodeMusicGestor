import { Suscripcion } from "../types/Suscripcion.js";
// src/models/Usuario.ts


// Clase Usuario
export class Usuario {
  // Atributos
  private _id: string;
  private nombre: string;
  private correo: string;
  private plan: Suscripcion;
  private fechaRegistro: Date;
  private playlists: string[];
  private limiteDispositivos: number;

  constructor(
    id: string,
    nombre: string,
    correo: string,
    plan: Suscripcion,
    fechaRegistro: Date,
    limiteDispositivos: number
  ) {
    this._id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.plan = plan;
    this.fechaRegistro = fechaRegistro;
    this.limiteDispositivos = limiteDispositivos;
    this.playlists = [];
  }

  // Métodos
  public crearPlaylist(playlist: string): string {
    this.playlists.push(playlist);
    return `Playlist "${playlist}" creada con éxito.`;
  }

  public borrarPlaylist(playlist: string): string {
    const index = this.playlists.indexOf(playlist);
    if (index >= 0) {
      this.playlists.splice(index, 1);
      return `Playlist "${playlist}" eliminada con éxito.`;
    }
    return `La playlist "${playlist}" no existe.`;
  }

  public agregarFavorito(cancion: string): string {
    // Aquí podrías tener otra lista de favoritos, por ahora lo simulo
    return `La canción "${cancion}" se agregó a favoritos.`;
  }

  public eliminarFavorito(cancion: string): string {
    // Simulación igual que arriba
    return `La canción "${cancion}" fue eliminada de favoritos.`;
  }

  public actualizarSuscripcion(suscripcion: Suscripcion): void {
    this.plan = suscripcion;
    console.log(`La suscripción se actualizó a: ${suscripcion}`);
  }

  // Getter opcional para ver las playlists
  public getPlaylists(): string[] {
    return this.playlists;
  }

  // Getter para el ID (solo lectura)
  public get id(): string {
    return this._id;
  }

  // Getters y Setters
  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getCorreo(): string {
    return this.correo;
  }

  public setCorreo(correo: string): void {
    this.correo = correo;
  }

  public getPlan(): Suscripcion {
    return this.plan;
  }

  public setPlan(plan: Suscripcion): void {
    this.plan = plan;
  }

  public getFechaRegistro(): Date {
    return this.fechaRegistro;
  }

  public setFechaRegistro(fecha: Date): void {
    this.fechaRegistro = fecha;
  }

  public getLimiteDispositivos(): number {
    return this.limiteDispositivos;
  }

  public setLimiteDispositivos(limite: number): void {
    this.limiteDispositivos = limite;
  }
}
