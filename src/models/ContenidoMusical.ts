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



