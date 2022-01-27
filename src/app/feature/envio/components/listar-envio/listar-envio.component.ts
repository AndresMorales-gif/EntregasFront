import { Component, OnInit } from '@angular/core';
import { Error } from '@core/modelo/error';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

@Component({
  selector: 'app-listar-envio',
  templateUrl: './listar-envio.component.html',
  styleUrls: ['./listar-envio.component.css']
})
export class ListarEnvioComponent implements OnInit {
  remitente: Usuario;
  errorListarEnvios: Error;
  consultaEnvios: boolean;
  envios: Envio[];

  constructor(protected envioService: EnvioService, protected usuarioService: UsuarioService) {    
    this.errorListarEnvios = new Error();
  }

  consultarUsuarioTerminado(usuario: Usuario) {
    this.remitente = usuario;
  }

  consultarEnvios(tipoConsulta: string) {
    this.envioService.consultarEnvios(this.remitente.idDocumento, tipoConsulta).toPromise()
      .then((envios) => {
        this.envios = envios;
        this.consultaEnvios = true;
      });
  }

  ngOnInit(): void {
    this.resetear();
  }

  resetear() {
    this.envios = [];
    this.consultaEnvios = false;
    this.remitente = null;
  }

}
