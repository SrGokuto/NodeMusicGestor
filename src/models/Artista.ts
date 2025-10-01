import { Cancion } from "./Cancion";
import { Playlist } from "./Playlist";

export class Artista {
  id: string;
  nombre: string;
  generoMusical: string;
  pais: string;
  albums: Playlist[];
  seguidores: number;

  constructor(id: string, nombre: string, generoMusical: string, pais: string) {
    this.id = id;
    this.nombre = nombre;
    this.generoMusical = generoMusical;
    this.pais = pais;
    this.albums = [];
    this.seguidores = 0;
  }

  agregarAlbum(album: Playlist): void {
    this.albums.push(album);
  }

  mostrarTopCanciones(): Cancion[] {
    console.log("Mostrando top canciones (no implementado)");
    return [];
  }

  sumarSeguidor(): void {
    this.seguidores++;
  }
}