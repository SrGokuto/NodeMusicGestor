import chalk from "chalk";
import { Tema } from "../types/tema.js";

let globalColor = chalk.white; // Color por defecto

export function consoleColor(tema: Tema) {
switch (tema) {
    case Tema.MORADO:
        globalColor = chalk.magenta;
        break;
    case Tema.VERDE:
        globalColor = chalk.green;
        break;
    case Tema.AZUL:
        globalColor = chalk.blue;
        break;
    case Tema.CIAN:
        globalColor = chalk.cyan;
        break;
    default:
        globalColor = chalk.white;
}

console.log = ((log) => (...args: any[]) => {
  log(globalColor(args.join(" ")));
})(console.log);
}