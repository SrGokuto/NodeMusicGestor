export enum Suscripcion {
  GRATUITA = "gratuita",
  PREMIUM = "premium",
  FAMILIAR = "familiar",
}


import { IUsuario } from "./IUsuario";


export class Usuario implements IUsuario {
  public id: string;
  public nombre: string;
  public correo: string;
  public plan: Suscripcion;
  public fechaRegistro: Date;
  public limiteDispositivos: number;
  private playlists: string[];

  constructor(
    id: string,
    nombre: string,
    correo: string,
    plan: Suscripcion,
    fechaRegistro: Date,
    limiteDispositivos: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.plan = plan;
    this.fechaRegistro = fechaRegistro;
    this.limiteDispositivos = limiteDispositivos;
    this.playlists = [];
  }

 
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
    return `La canción "${cancion}" se agregó a favoritos.`;
  }

  public eliminarFavorito(cancion: string): string {
    return `La canción "${cancion}" fue eliminada de favoritos.`;
  }

  public actualizarSuscripcion(suscripcion: Suscripcion): void {
    this.plan = suscripcion;
    console.log(`La suscripción se actualizó a: ${suscripcion}`);
  }

  public getPlaylists(): string[] {
    return this.playlists;
  }
}
