// src/models/Usuario.ts

// Enumeración de planes de suscripción
export enum Suscripcion {
  GRATUITA = "gratuita",
  PREMIUM = "premium",
  FAMILIAR = "familiar",
}

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
}
