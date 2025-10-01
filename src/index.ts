

import { Usuario, Suscripcion } from "./models/usuario";
import { UsuarioPremium } from "./models/usuarioPremium";
import { Tema } from "./models/tema";


const user1 = new Usuario(
  "001",                        
  "sara",                 
  "sara@gmail.com",      
  Suscripcion.GRATUITA,         
  new Date("2025-10-01"),      
  3                             
);

console.log("=== PRUEBAS DE USUARIO ===");
console.log(user1.crearPlaylist("Mi Playlist Favorita"));
console.log(user1.crearPlaylist("Música Relajante"));
console.log(user1.borrarPlaylist("Mi Playlist Favorita"));
console.log(user1.borrarPlaylist("Playlist Inexistente"));
console.log(user1.agregarFavorito("Shape of You"));
console.log(user1.eliminarFavorito("Shape of You"));
user1.actualizarSuscripcion(Suscripcion.PREMIUM);
console.log("Playlists actuales:", user1.getPlaylists());



const userPremium = new UsuarioPremium(
  "002",
  "sara",
  "sara@gmail.com",
  new Date("2025-01-01"),   
  new Date("2025-09-01"),   
  new Date("2025-10-01"),   
  true,                     
  Tema.MORADO               
);

console.log("\n=== PRUEBAS DE USUARIO PREMIUM ===");
console.log("Tema actual:", userPremium.getTemaPreferido());
userPremium.personalizarTema(Tema.CIAN);
userPremium.toggleRenovacion();
userPremium.reportarProblema("La música no carga correctamente");