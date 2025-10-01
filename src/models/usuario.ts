
export enum Suscripcion {
  GRATUITA = "gratuita",
  PREMIUM = "premium",
  FAMILIAR = "familiar",
}


export class Usuario {
 
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

  
  public get id(): string {
    return this._id;

  }
  public getNombre(): string {
  return this.nombre;
}

}
