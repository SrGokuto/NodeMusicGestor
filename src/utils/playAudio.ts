import { YtDlp } from 'ytdlp-nodejs';
import { createRequire } from "module";
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { unlink } from 'fs/promises';
const require = createRequire(import.meta.url);
const player = require('node-wav-player');

const ytdlp = new YtDlp();

// Configurar la ruta del binario de ffmpeg
ffmpeg.setFfmpegPath(ffmpegStatic as string);


// Borrar un archivo
async function borrarArchivo(ruta: string) {
  try {
    await unlink(ruta);
    console.log(`✓ Archivo eliminado: ${ruta}`);
  } catch (error) {
    console.error(`Error al borrar ${ruta}:`, error);
  }
}

// Uso

async function convertirM4AaWAV(archivoEntrada: string, archivoSalida: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(archivoEntrada)
      .toFormat('wav')
      .on('start', (commandLine) => {
        console.log('Comando FFmpeg:', commandLine);
      })
      .on('progress', (progress) => {
        console.log(`Procesando: ${progress.percent ? Math.round(progress.percent) : 0}% completado`);
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

async function playAudio() {
  try {

    await borrarArchivo('./music/audio.wav');
    await borrarArchivo('./music/audio.m4a');
    // Descargar como m4a (mejor calidad disponible)
    const output = await ytdlp.downloadAsync(
      'https://youtu.be/4JkIs37a2JE?si=XS_uEVfImEb_gO-T',
      {
        format: "bestaudio", // Descarga el mejor audio disponible (usualmente m4a)
        output: "./music/audio.m4a", // Guarda como m4a primero
        onProgress: (progress) => {
          console.log(progress);
        },
      }
    );

    console.log('Download completed:', output);

    // Convertir m4a a wav
    console.log('Convirtiendo a WAV...');
    await convertirM4AaWAV('./music/audio.m4a', './music/audio.wav');

    console.log("Playing");
    await player.play({
      path: './music/audio.wav',
    });

    console.log('Reproducción completada');

  } catch (error) {
    console.error('Error:', error);
  }
}

playAudio();