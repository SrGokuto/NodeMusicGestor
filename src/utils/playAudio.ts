import { YtDlp } from 'ytdlp-nodejs';
import { createRequire } from "module";
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { unlink } from 'fs/promises';
import { obtenerDuracionFFmpeg } from './obtenerDuracion.js';
const require = createRequire(import.meta.url);
const player = require('node-wav-player');

const ytdlp = new YtDlp();

// Configurar la ruta del binario de ffmpeg
ffmpeg.setFfmpegPath(ffmpegStatic as string);


// Borrar un archivo
async function borrarArchivo(ruta: string) {
  try {
    await unlink(ruta);
//    console.log(`✓ Archivo eliminado: ${ruta}`);
  } catch (error) {
//    console.error(`Error al borrar ${ruta}`);
  }
}

// Uso

async function convertirM4AaWAV(archivoEntrada: string, archivoSalida: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(archivoEntrada)
      .toFormat('wav')
      .on('start', () => {
        console.log('Convirtiendo:'); //Potencialmente se podría agregar commandLine como parametro a la función y mostrarlo en consola, para temas de debug
      })
      .on('end', () => {
        console.log('Conversión finalizada');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      })
      .save(archivoSalida);
  });
}

export async function playAudio(url: string) {
  try {

    await borrarArchivo('./music/audio.wav');
    await borrarArchivo('./music/audio.m4a');
    // Descargar como m4a (mejor calidad disponible)
    await ytdlp.downloadAsync(
      url,
      {
        format: "bestaudio", // Descarga el mejor audio disponible (usualmente m4a)
        output: "./music/audio.m4a", // Guarda como m4a primero
      }
    );

    console.log('Descarga completada:');

    // Convertir m4a a wav
    console.log('Convirtiendo a WAV...');
    await convertirM4AaWAV('./music/audio.m4a', './music/audio.wav');

    console.log("Reproduciendo audio...");
    const duracion = obtenerDuracionFFmpeg('./music/audio.wav');
    console.log(`Duración: ${duracion.toFixed(2)} segundos`);
    
    // Reproducir el audio y esperar a que termine
    await player.play({
      path: './music/audio.wav',
    });
    
    // Esperar la duración del audio para que termine de reproducirse
    await new Promise(resolve => setTimeout(resolve, duracion * 1000));
    
    console.log('✅ Reproducción completada');
    
    // Borrar archivos después de reproducir
    await borrarArchivo('./music/audio.wav');
    await borrarArchivo('./music/audio.m4a');

  } catch (error) {
    console.error('Error:', error);
  }
}
