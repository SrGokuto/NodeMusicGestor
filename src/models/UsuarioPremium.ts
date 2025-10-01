import { Usuario} from "./Usuario.js";
import { Tema } from "../types/tema.js";
import { Suscripcion } from "../types/Suscripcion.js";

export class UsuarioPremium extends Usuario {
  public fechaPago: Date;
  public fechaVencimiento: Date;
  public autoRenovacion: boolean;
  public temaPreferido: Tema;

  constructor(
    id: string,
    nombre: string,
    correo: string,
    fechaRegistro: Date,
    fechaPago: Date,
    fechaVencimiento: Date,
    autoRenovacion: boolean,
    temaPreferido: Tema
  ) {
    super(id, nombre, correo, Suscripcion.PREMIUM, fechaRegistro, 10);
    this.fechaPago = fechaPago;
    this.fechaVencimiento = fechaVencimiento;
    this.autoRenovacion = autoRenovacion;
    this.temaPreferido = temaPreferido;
  }

  public toggleRenovacion(): void {
    this.autoRenovacion = !this.autoRenovacion;
    console.log(
      `La auto-renovación ahora está: ${this.autoRenovacion ? "ACTIVA" : "DESACTIVADA"}`
    );
  }

  public personalizarTema(tema: Tema): void {
    this.temaPreferido = tema;
    console.log(`Tema preferido actualizado a: ${tema}`);
  }

  public reportarProblema(problema: string): void {
    console.log(`Se ha reportado el problema: "${problema}". Nuestro equipo lo revisará.`);
  }

  // Getters opcionales
  public getTemaPreferido(): Tema {
    return this.temaPreferido;
  }

  public getFechaVencimiento(): Date {
    return this.fechaVencimiento;
  }

  public getFechaPago(): Date {
    return this.fechaPago;
  }

  public isAutoRenovacionActiva(): boolean {
    return this.autoRenovacion;
  }
}
