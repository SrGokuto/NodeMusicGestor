import { Usuario } from "./models/Usuario.js";
import { UsuarioPremium } from "./models/UsuarioPremium.js";
import { Tema } from "./types/tema.js";
import { Suscripcion } from "./types/Suscripcion.js";
import { input, select } from '@inquirer/prompts';

while (true) {
  const action = await select({
    message: '¿Qué acción deseas realizar?',
    choices: [
      { name: 'Crear Usuario Básico', value: 'crear_basico' },
      { name: 'Crear Usuario Premium', value: 'crear_premium' },
      { name: 'Salir', value: 'salir' }
    ]
})

  if (action === 'crear_basico') {
    const id = await input({ message: 'ID del usuario:' });
    const nombre = await input({ message: 'Nombre del usuario:' });
    const correo = await input({ message: 'Correo del usuario:' });
    const fechaRegistroInput = await input({ message: 'Fecha de registro (YYYY-MM-DD):' });
    const fechaRegistro = new Date(fechaRegistroInput);
    const usuarioBasico = new Usuario(id, nombre, correo, Suscripcion.GRATUITA, fechaRegistro, 5);
    console.log('Usuario Básico creado:', usuarioBasico);

  } else if (action === 'crear_premium') {
    const id = await input({ message: 'ID del usuario:' });
    const nombre = await input({ message: 'Nombre del usuario:' });
    const correo = await input({ message: 'Correo del usuario:' });
    const fechaRegistroInput = await input({ message: 'Fecha de registro (YYYY-MM-DD):' });
    const fechaRegistro = new Date(fechaRegistroInput);
    const fechaPagoInput = await input({ message: 'Fecha de pago (YYYY-MM-DD):' });
    const fechaPago = new Date(fechaPagoInput);
    const fechaVencimientoInput = await input({ message: 'Fecha de vencimiento (YYYY-MM-DD):' });
    const fechaVencimiento = new Date(fechaVencimientoInput);
    const autoRenovacion = await select({
      message: '¿Deseas activar la auto-renovación?',
      choices: [
        { name: 'Sí', value: true },
        { name: 'No', value: false }
      ]
    });
    const temaPreferido = await select({
      message: 'Selecciona tu tema preferido:',
      choices: [
        { name: 'morado', value: Tema.MORADO },
        { name: 'verde', value: Tema.VERDE },
        { name: 'azul', value: Tema.AZUL },
        { name: 'cian', value: Tema.CIAN }
      ]
    });
    const usuarioPremium = new UsuarioPremium(id, nombre, correo, fechaRegistro, fechaPago, fechaVencimiento, autoRenovacion, temaPreferido);
    console.log('Usuario Premium creado:', usuarioPremium);
  } else if (action === 'salir') {
    console.log('Saliendo del programa.');
    break;

  }
  const continuar = await select({
    message: '¿Deseas realizar otra acción?',
    choices: [
      { name: 'Sí', value: true },
      { name: 'No', value: false }
    ]
  });
  if (!continuar) {
    console.log('Saliendo del programa.');
    break;
  }
  console.log('Volviendo al menú principal...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.clear();
}
 


