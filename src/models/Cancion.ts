import { ContenidoMusical } from "./ContenidoMusical";

export class Cancion extends ContenidoMusical{
   public idioma:string;
   public favorita:boolean;
   public descargas:number;
   public bpm:number;
   public productor:string;
   public compositor:string;
   public cantante:string;
   public autor:string;
   constructor(nombre:string,genero:string,anio:number,reproducciones:number,duracion:number,calificacion:number,idioma:string,favorita:boolean,descargas:number,bpm:number,productor:string,compositor:string,cantante:string,autor:string){
       super(nombre,genero,anio,reproducciones,duracion,calificacion);
       this.idioma = idioma;
       this.favorita = favorita;
       this.descargas = descargas;
       this.bpm = bpm;
       this.productor = productor;
       this.compositor = compositor;
       this.cantante = cantante;
       this.autor = autor;
   }
   obtenerResumnen():string{
         return `Canción: ${this.nombre}, Cantante: ${this.cantante}, Compositor: ${this.compositor}, Productor: ${this.productor}, BPM: ${this.bpm}, Descargas: ${this.descargas}, Favorita: ${this.favorita ? 'Sí' : 'No'}, Idioma: ${this.idioma}`;
   }
   mostrarInfo(): string {
    return `${super.mostrarInfo()}, Idioma: ${this.idioma}, Favorita: ${this.favorita ? 'Sí' : 'No'}, Descargas: ${this.descargas}, BPM: ${this.bpm}, Productor: ${this.productor}, Compositor: ${this.compositor}, Cantante: ${this.cantante}, Autor: ${this.autor}`;
   }
}