import { Injectable } from '@angular/core';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelo/usuario';

@Injectable()
export class UsuarioService {
    constructor(protected http: HttpService) { }

    public consultarPorDocumento(usuario: Usuario) {
        return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${usuario.idDocumento}`,
            this.http.optsName('Consultar usuario'));
    }

    public crearUsuario(usuario: Usuario) {
        return this.http.doPost<Usuario, Respuesta>(`${environment.endpoint}/usuarios/`, usuario,
            this.http.optsName('Crear usuario'));
    }

    public actualizarUsuario(usuario: Usuario) {
        return this.http.doPut<Usuario, void>(`${environment.endpoint}/usuarios/${usuario.id}`, usuario,
            this.http.optsName('Actualizar usuario'));
    }
}
