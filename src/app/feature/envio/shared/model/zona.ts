export class Zona {
    id: number;
    nombre: string;
    diasEntrega: number;

    constructor(
        id: number,
        nombre: string,
        diasEntrega: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.diasEntrega = diasEntrega;
    }
}
