export class Envio {
    id: number;
    remitente: string;
    destinatario: string;
    zona: number;
    envioPlus: boolean;
    pesoCarga: number;
    fechaEntrega: Date;
    precio: number;
    fechaCreacion: Date;

    constructor(id: number,
        remitente: string,
        destinatario: string,
        zona: number,
        envioPlus: boolean,
        pesoCarga: number,
        fechaEntrega: Date,
        precio: number,
        fechaCreacion: Date) {

        this.id = id;
        this.remitente = remitente;
        this.destinatario = destinatario;
        this.zona = zona;
        this.envioPlus = envioPlus;
        this.pesoCarga = pesoCarga;
        this.fechaEntrega = fechaEntrega;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;

    }
}