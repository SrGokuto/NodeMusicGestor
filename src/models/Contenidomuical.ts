export class ContenidoMusical {
    public nombre:string;
    public genero:string;
    public anio:number;
    public reproducciones:number;   
    public duracion:number;
    public calificacion:number;
   constructor(nombre:string,genero:string,anio:number,reproducciones:number,duracion:number,calificacion:number){
       this.nombre = nombre;
       this.genero = genero;
       this.anio = anio;
       this.reproducciones = reproducciones;
       this.duracion = duracion;
       this.calificacion = calificacion;
   }
actualizarAnio(anio:number):void{
    this.anio = anio;
}
mostrarInfo():string{
    return `Nombre: ${this.nombre}, Genero: ${this.genero}, Año: ${this.anio}, Reproducciones: ${this.reproducciones}, Duración: ${this.duracion} seg, Calificación: ${this.calificacion}/5`;

}
}
class Cancion extends ContenidoMusical{
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
class Playlist extends ContenidoMusical{
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

    
 
}

}

