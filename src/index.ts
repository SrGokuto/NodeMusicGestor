import { Usuario } from "./models/Usuario.js";
import { UsuarioPremium } from "./models/UsuarioPremium.js";
import { Tema } from "./types/tema.js";
import { Suscripcion } from "./types/Suscripcion.js";
import { YoutubeService } from "./services/YoutubeService.js";
import { input, password, select } from '@inquirer/prompts';
import { objetoComoTabla } from "./utils/objetoComoTabla.js";
import Sugar from 'sugar';
import "sugar/locales/es.js"; // Importa el idioma español de la libreria Sugar
import { consoleColor } from "./utils/consoleColor.js";
import { playAudio } from "./utils/playAudio.js";

Sugar.extend();
Sugar.Date.setLocale('es');

// ========== PSEUDO BASE DE DATOS ==========
// Interfaz para almacenar datos de usuario en la BD
interface UsuarioEnBD {
  usuario: Usuario | UsuarioPremium;
  password: string;
  videosGuardados: Array<{ title: string, url: string, channelTitle: string }>;
}

console.clear();

// Map que funciona como base de datos en memoria (correo -> datos del usuario)
const usuariosDB = new Map<string, UsuarioEnBD>();

// Variables de sesión
let loggedIn: boolean = false;
let usuarioActual: UsuarioEnBD | null = null;
while (true) {
  const action = await select({
    message: '¿Qué acción deseas realizar?',
    choices: [
      { name: 'Buscar Videos en YouTube', value: 'buscar_youtube' },
      { name: 'Ver Videos Guardados', value: 'ver_videos' },
      { name: 'Listar Videos en JSON', value: 'listar_videos_json' },
      { name: 'Reproducir videos', value: 'reproducir_videos' },
      { name: 'Reproducir todo', value: 'reproducir_todo' },
      { name: 'Iniciar Sesión', value: 'login' },
      { name: 'Registrarse', value: 'register' },
      { name: 'Cerrar Sesión', value: 'logout' },
      { name: 'Salir', value: 'salir' }
    ]
  });

  if (action === 'ver_videos') {
    if (!loggedIn || !usuarioActual) {
      console.log('❌ Debes iniciar sesión para ver tus videos guardados.');
      continue;
    }
    // Usar el tema del usuario premium si aplica
    if (usuarioActual.usuario instanceof UsuarioPremium) {
      consoleColor(usuarioActual.usuario.temaPreferido);
    } else {
      consoleColor(Tema.AZUL);
    }

    if (usuarioActual.videosGuardados.length === 0) {
      console.log('📭 No hay videos guardados. Primero busca algunos videos en YouTube.');
    } else {
      console.log(`\n📁 Videos guardados de ${usuarioActual.usuario.nombre} (${usuarioActual.videosGuardados.length} total):`);
      usuarioActual.videosGuardados.forEach((video, index) => {
        console.log(`\n${index + 1}. ${video.title}`);
        console.log(`   Canal: ${video.channelTitle}`);
        console.log(`   URL: ${video.url}`);
      });
    }
  }
  if (action === 'listar_videos_json') {
    if (!loggedIn || !usuarioActual) {
      console.log('❌ Debes iniciar sesión para ver tus videos guardados.');
      continue;
    }
    // Usar el tema del usuario premium si aplica
    if (usuarioActual.usuario instanceof UsuarioPremium) {
      consoleColor(usuarioActual.usuario.temaPreferido);
    } else {
      consoleColor(Tema.AZUL);
    }

    if (usuarioActual.videosGuardados.length === 0) {
      console.log('📭 No hay videos guardados. Primero busca algunos videos en YouTube.');
    } else {
      console.log(`\n📁 Videos guardados de ${usuarioActual.usuario.nombre} (${usuarioActual.videosGuardados.length} total):`);
      console.log(JSON.stringify(usuarioActual.videosGuardados, null, 2));
    }
  }
  // ...existing code...
else if (action === 'reproducir_todo') {
  if (!loggedIn || !usuarioActual) {
    console.log('❌ Debes iniciar sesión para reproducir videos.');
    continue;
  }

  // Usar el tema del usuario premium si aplica
  if (usuarioActual.usuario instanceof UsuarioPremium) {
    consoleColor(usuarioActual.usuario.temaPreferido);
  } else {
    consoleColor(Tema.AZUL);
  }

  if (usuarioActual.videosGuardados.length === 0) {
    console.log('📭 No hay videos guardados para reproducir. Primero busca algunos videos en YouTube.');
  } else {
    console.log(`\n🎵 Reproduciendo ${usuarioActual.videosGuardados.length} videos...\n`);
    
    // Usar for...of en lugar de forEach para manejar correctamente el async/await
    for (const element of usuarioActual.videosGuardados) {
      console.log(`\n▶️  Reproduciendo: ${element.title}`);
      console.log(`   Canal: ${element.channelTitle}`);
      console.log(`   URL: ${element.url}`);
      
      try {
        await playAudio(element.url);
        console.log('✅ Reproducción completada\n');
      } catch (error) {
        console.error('❌ Error al reproducir el video:', error);
        console.log('Continuando con el siguiente video...\n');
      }
    }
    
    console.log('🎉 Todos los videos han sido reproducidos.');
  }
}
// ...existing code...  

  else if (action === 'reproducir_videos') {
    if (!loggedIn || !usuarioActual) {
      console.log('❌ Debes iniciar sesión para reproducir videos.');
      continue;
    }

    // Usar el tema del usuario premium si aplica
    if (usuarioActual.usuario instanceof UsuarioPremium) {
      consoleColor(usuarioActual.usuario.temaPreferido);
    } else {
      consoleColor(Tema.AZUL);
    }

    if (usuarioActual.videosGuardados.length === 0) {
      console.log('📭 No hay videos guardados para reproducir. Primero busca algunos videos en YouTube.');
    } else {
      console.log(`\n🎵 Selecciona un video para reproducir:`);

      const choices = usuarioActual.videosGuardados.map((video, index) => ({
        name: `${index + 1}. ${video.title} - ${video.channelTitle}`,
        value: index
      }));

      const seleccion = await select({
        message: 'Elige el video:',
        choices: choices
      });

      const videoSeleccionado = usuarioActual.videosGuardados[seleccion];
      console.log(`\n▶️  Reproduciendo: ${videoSeleccionado.title}`);
      console.log(`   Canal: ${videoSeleccionado.channelTitle}`);
      console.log(`   URL: ${videoSeleccionado.url}`);
      await playAudio(videoSeleccionado.url);
      console.log('Reproducción completada ✅');
    }
  } else if (action === 'login') {
    if (loggedIn) {
      console.log(`✅ Ya has iniciado sesión como ${usuarioActual?.usuario.nombre}.`);
      continue;
    }
    const correo = await input({ message: 'Correo:' });
    const contrasena = await password({ message: 'Contraseña:', mask: '*' });

    // Buscar usuario en la base de datos
    const usuarioEncontrado = usuariosDB.get(correo);

    if (usuarioEncontrado && usuarioEncontrado.password === contrasena) {
      console.log(`✅ Inicio de sesión exitoso. Bienvenido, ${usuarioEncontrado.usuario.nombre}!`);
      loggedIn = true;
      usuarioActual = usuarioEncontrado;
    } else {
      console.log('❌ Credenciales inválidas. Inténtalo de nuevo.');
    }
  } else if (action === 'register') {
    console.log('--- Registro de Usuario ---');
    const tipoUsuario = await select({
      message: 'Selecciona el tipo de usuario:',
      choices: [
        { name: 'Básico (Gratuito)', value: 'basico' },
        { name: 'Premium', value: 'premium' }
      ]
    });

    if (tipoUsuario === 'basico') {
      const id = await input({ message: 'ID del usuario:' });
      const nombre = await input({ message: 'Nombre del usuario:' });
      const correo = await input({ message: 'Correo del usuario:' });

      // Verificar si el correo ya está registrado
      if (usuariosDB.has(correo)) {
        console.log('❌ Este correo ya está registrado. Por favor, usa otro correo o inicia sesión.');
        continue;
      }

      const passwordInput = await password({ message: 'Contraseña:', mask: '*' });
      const passwordConfirm = await password({ message: 'Confirma tu contraseña:', mask: '*' });

      if (passwordInput !== passwordConfirm) {
        console.log('❌ Las contraseñas no coinciden. Inténtalo de nuevo.');
        continue;
      }

      const fechaRegistroInput = await input({ message: 'Fecha de registro (YYYY-MM-DD):', default: Sugar.Date.format(new Date(), '{yyyy}-{MM}-{dd}') });
      const fechaRegistro = Sugar.Date.create(fechaRegistroInput);
      const usuarioBasico = new Usuario(id, nombre, correo, Suscripcion.GRATUITA, fechaRegistro, 5);

      // Guardar en la base de datos
      usuariosDB.set(correo, {
        usuario: usuarioBasico,
        password: passwordInput,
        videosGuardados: []
      });

      console.log('✅ Usuario Básico registrado exitosamente:');
      objetoComoTabla(usuarioBasico);

    } else if (tipoUsuario === 'premium') {
      const id = await input({ message: 'ID del usuario:' });
      const nombre = await input({ message: 'Nombre del usuario:' });
      const correo = await input({ message: 'Correo del usuario:' });

      // Verificar si el correo ya está registrado
      if (usuariosDB.has(correo)) {
        console.log('❌ Este correo ya está registrado. Por favor, usa otro correo o inicia sesión.');
        continue;
      }

      const passwordInput = await password({ message: 'Contraseña:', mask: '*' });
      const passwordConfirm = await password({ message: 'Confirma tu contraseña:', mask: '*' });

      if (passwordInput !== passwordConfirm) {
        console.log('❌ Las contraseñas no coinciden. Inténtalo de nuevo.');
        continue;
      }

      const fechaRegistroInput = await input({ message: 'Fecha de registro (YYYY-MM-DD):', default: Sugar.Date.format(new Date(), '{yyyy}-{MM}-{dd}') });
      const fechaRegistro = Sugar.Date.create(fechaRegistroInput);
      const fechaPagoInput = await input({ message: 'Fecha de pago (YYYY-MM-DD):', default: Sugar.Date.format(new Date(), '{yyyy}-{MM}-{dd}') });
      const fechaPago = Sugar.Date.create(fechaPagoInput);
      const fechaVencimientoInput = await input({ message: 'Fecha de vencimiento (YYYY-MM-DD):', default: Sugar.Date.format(Sugar.Date.advance(new Date(), '1 month'), '{yyyy}-{MM}-{dd}') });
      const fechaVencimiento = Sugar.Date.create(fechaVencimientoInput);
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

      // Guardar en la base de datos
      usuariosDB.set(correo, {
        usuario: usuarioPremium,
        password: passwordInput,
        videosGuardados: []
      });

      console.log('✅ Usuario Premium registrado exitosamente:');
      objetoComoTabla(usuarioPremium);
    }
  } else if (action === 'buscar_youtube') {
    if (!loggedIn) {
      console.log('❌ Debes iniciar sesión para buscar videos en YouTube.');
      continue;
    }
    try {
      const youtubeService = new YoutubeService();
      const termino = await input({ message: 'Ingresa el título o término de búsqueda:' });
      const maxResultados = await input({
        message: 'Número máximo de resultados (presiona Enter para 10):',
        default: '10'
      });

      console.log('Buscando videos en YouTube...');
      const videosSeleccionados = await youtubeService.buscarYSeleccionarVideos(termino, parseInt(maxResultados) || 10);

      // Agregar los videos seleccionados al array del usuario actual
      if (videosSeleccionados.length > 0 && usuarioActual) {
        videosSeleccionados.forEach(video => {
          usuarioActual!.videosGuardados.push({
            title: video.title,
            url: video.url,
            channelTitle: video.channelTitle
          });
        });
        console.log(`\n✅ ${videosSeleccionados.length} video(s) agregado(s) a tu lista de videos guardados.`);
      }
    } catch (error) {
      console.error('❌ Error al buscar videos:', error);
    }

  } else if (action === 'logout') {
    if (!loggedIn) {
      console.log('❌ No has iniciado sesión.');
    } else {
      console.log(`👋 Hasta luego, ${usuarioActual?.usuario.nombre}!`);
      loggedIn = false;
      usuarioActual = null;
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



