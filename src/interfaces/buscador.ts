import { Usuario } from "../models/Usuario.js";

export interface Buscador {
  buscarPorNombre(nombre: string): Usuario | null;
  buscarVarios(nombres: string[]): Usuario[];
}