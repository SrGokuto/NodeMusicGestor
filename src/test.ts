import { YtDlp } from 'ytdlp-nodejs';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const player = require("play-sound")({ players: ["ffplay", "paplay", "aplay"] });
const ytdlp = new YtDlp();

async function downloadAudio() {
  try {
    const output = await ytdlp.downloadAsync(
      'https://youtu.be/-7Tyd3oHaJQ?si=ch2Q1mvThnlIFqNV',
      {          
        format: "bestaudio[ext=m4a]",   // 👈 fuerza a que elija m4a
        output: "./music/cancion.m4a",          // salida directa en m4a
        onProgress: (progress) => {
          console.log(progress);
        },
      }
    );
    console.log('Download completed:', output);
    console.log("Playing");
    
    // Play audio using the play-sound library
    player.play("./music/cancion.m4a", (err: any) => {
      if (err) {
        console.log("Error playing audio:", err);
      } else {
        console.log("Audio finished playing");
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

downloadAudio();
