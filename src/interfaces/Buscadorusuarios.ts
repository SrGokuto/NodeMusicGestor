import { Usuario } from "../models/usuario";
import { Buscador } from "../interfaces/buscador";  

export class BuscadorUsuarios implements Buscador {
  private usuarios: Usuario[];

  constructor(usuarios: Usuario[]) {
    this.usuarios = usuarios;
  }

  buscarPorNombre(nombre: string): Usuario | null {
    const usuario = this.usuarios.find(u => u.nombreUsuario === nombre);
    return usuario || null;
  }

  buscarVarios(nombres: string[]): Usuario[] {
    return this.usuarios.filter(u => nombres.includes(u.nombreUsuario));
  }
}
