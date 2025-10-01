import { Usuario } from "../models/Usuario.js";
import { Buscador } from "../interfaces/buscador.js";  

export class BuscadorUsuarios implements Buscador {
  private usuarios: Usuario[];

  constructor(usuarios: Usuario[]) {
    this.usuarios = usuarios;
  }

  buscarPorNombre(nombre: string): Usuario | null {
    const usuario = this.usuarios.find(u => u.getNombre() === nombre);
    return usuario || null;
  }

  buscarVarios(nombres: string[]): Usuario[] {
    return this.usuarios.filter(u => nombres.includes(u.getNombre()));
  }
}
