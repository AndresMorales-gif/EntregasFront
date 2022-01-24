import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Usuario } from "../model/usuario";

@Injectable()
export class UsuarioService {
    constructor(protected http: HttpService) { }

    public consultarPorDocumento(usuario: Usuario) {
        return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${usuario.idDocumento}`,
            this.http.optsName('consultar usuario'));
    }
}