import { ContenidoMusical } from "./ContenidoMusical";
import { Cancion } from "./Cancion";

export class Playlist extends ContenidoMusical{
    public visibilidad:boolean;
    public descripcion:string;
    public colaborativa:boolean;
     public etiquetas:string[];
    public canciones:Cancion[];
    constructor(nombre:string,genero:string,anio:number,reproducciones:number,duracion:number,calificacion:number,visibilidad:boolean,descripcion:string,colaborativa:boolean,etiquetas:string[],canciones:Cancion[]){
        super(nombre,genero,anio,reproducciones,duracion,calificacion);
        this.visibilidad = visibilidad;
        this.descripcion = descripcion;
        this.colaborativa = colaborativa;
        this.etiquetas = etiquetas;
        this.canciones = canciones;
    }
    mezclar():void{
       // Algoritmo simple para mezclar las canciones
    
}
    ordenar():void{
        // Algoritmo simple para ordenar las canciones por nombre
    }
    mostrarInfo(): string {
        const cancionesInfo = this.canciones.map(cancion => cancion.obtenerResumnen()).join(' | ');
        return `${super.mostrarInfo()}, Visibilidad: ${this.visibilidad ? 'Pública' : 'Privada'}, Descripción: ${this.descripcion}, Colaborativa: ${this.colaborativa ? 'Sí' : 'No'}, Etiquetas: ${this.etiquetas.join(', ')}, Canciones: [${cancionesInfo}]`;
    }
    vaciar():void{
        this.canciones = [];
    }
    exportarJSON():string{
        return JSON.stringify(this);
    }
}
