import { Usuario } from "./models/Usuario.js";
import { UsuarioPremium } from "./models/UsuarioPremium.js";
import { Tema } from "./types/tema.js";
import { Suscripcion } from "./types/Suscripcion.js";
import { YoutubeService } from "./services/YoutubeService.js";
import { input, select } from '@inquirer/prompts';

// Array global para almacenar los videos encontrados
let videosEncontrados: Array<{title: string, url: string, channelTitle: string}> = [];

while (true) {
  const action = await select({
    message: '¿Qué acción deseas realizar?',
    choices: [
      { name: 'Crear Usuario Básico', value: 'crear_basico' },
      { name: 'Crear Usuario Premium', value: 'crear_premium' },
      { name: 'Buscar Videos en YouTube', value: 'buscar_youtube' },
      { name: 'Ver Videos Guardados', value: 'ver_videos' },
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
  
  } else if (action === 'buscar_youtube') {
    try {
      const youtubeService = new YoutubeService();
      const termino = await input({ message: 'Ingresa el título o término de búsqueda:' });
      const maxResultados = await input({ 
        message: 'Número máximo de resultados (presiona Enter para 10):',
        default: '10'
      });
      
      console.log('Buscando videos en YouTube...');
      const videos = await youtubeService.buscarVideosPorTitulo(termino, parseInt(maxResultados) || 10);
      
      if (videos.length > 0) {
        console.log(`\n✅ Se encontraron ${videos.length} videos:`);
        videos.forEach((video, index) => {
          console.log(`\n${index + 1}. ${video.title}`);
          console.log(`   Canal: ${video.channelTitle}`);
          console.log(`   URL: ${video.url}`);
          
          // Guardar en el array global
          videosEncontrados.push({
            title: video.title,
            url: video.url,
            channelTitle: video.channelTitle
          });
        });
        console.log(`\n📁 ${videos.length} videos han sido guardados en el array.`);
      } else {
        console.log('❌ No se encontraron videos para ese término de búsqueda.');
      }
    } catch (error) {
      console.error('❌ Error al buscar videos:', error);
    }

  } else if (action === 'ver_videos') {
    if (videosEncontrados.length === 0) {
      console.log('📭 No hay videos guardados. Primero busca algunos videos en YouTube.');
    } else {
      console.log(`\n📁 Videos guardados (${videosEncontrados.length} total):`);
      videosEncontrados.forEach((video, index) => {
        console.log(`\n${index + 1}. ${video.title}`);
        console.log(`   Canal: ${video.channelTitle}`);
        console.log(`   URL: ${video.url}`);
      });
    }

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
 


