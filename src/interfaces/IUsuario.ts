
import { Suscripcion } from "./usuario";

export interface IUsuario {
  id: string;
  nombre: string;
  correo: string;
  plan: Suscripcion;
  fechaRegistro: Date;
  limiteDispositivos: number;

  crearPlaylist(playlist: string): string;
  borrarPlaylist(playlist: string): string;
  agregarFavorito(cancion: string): string;
  eliminarFavorito(cancion: string): string;
  actualizarSuscripcion(suscripcion: Suscripcion): void;
  getPlaylists(): string[];
}