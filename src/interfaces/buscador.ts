import { Usuario } from "./usuario";

export interface Buscador {
  buscarPorNombre(nombre: string): Usuario | null;
  buscarVarios(nombres: string[]): Usuario[];
}