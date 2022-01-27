export class Usuario {
    id: number;
    nombre: string;
    idDocumento: string;

    constructor(id: number, nombre: string, idDocumento: string) {
        this.id = id;
        this.nombre = nombre;
        this.idDocumento = idDocumento;
    }
}
