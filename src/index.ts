// src/index.ts
// Aquí va el código de la funcionalidad principal

import { Usuario, Suscripcion } from "./models/usuario";
import { UsuarioPremium } from "./models/usuarioPremium";
import { Tema } from "./models/tema";


// === USUARIO NORMAL ===
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


// === USUARIO PREMIUM ===
const userPremium = new UsuarioPremium(
  "002",
  "Valentina",
  "vale@example.com",
  new Date("2025-01-01"),   // fecha registro
  new Date("2025-09-01"),   // fecha pago
  new Date("2025-10-01"),   // fecha vencimiento
  true,                     // auto renovación
  Tema.MORADO               // tema preferido inicial
);

console.log("\n=== PRUEBAS DE USUARIO PREMIUM ===");
console.log("Tema actual:", userPremium.getTemaPreferido());
userPremium.personalizarTema(Tema.CIAN);
userPremium.toggleRenovacion();
userPremium.reportarProblema("La música no carga correctamente");