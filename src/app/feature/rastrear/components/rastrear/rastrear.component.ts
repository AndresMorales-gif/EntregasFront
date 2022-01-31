import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { Usuario } from '@core/modelo/usuario';
import { UsuarioService } from '@core/services/usuario.service';

const ERROR_CONSULTA = 'Error al realizar la consulta';
const ERROR_ENVIO = 'Error al consultar el envio';

@Component({
  selector: 'app-rastrear',
  templateUrl: './rastrear.component.html',
  styleUrls: ['./rastrear.component.css']
})
export class RastrearComponent implements OnInit {
  rastrearEnvioForm: FormGroup;
  errorConsultaEnvio: Error;
  envio: Envio;
  remitente: Usuario;
  destinatario: Usuario;
  consultaCompleta = false;

  constructor(protected envioService: EnvioService, protected usuarioService: UsuarioService) {
    this.errorConsultaEnvio = new Error();
  }

  ngOnInit(): void {
    this.construirFormularioConsultarGuia();
  }

  consultarEnvio(): Promise<void> {
    return this.envioService.consultarEnvioPorId(this.rastrearEnvioForm.value.idEnvio).toPromise()
      .then((envio) => {
        this.errorConsultaEnvio.isError = false;
        this.envio = envio;

        return this.usuarioService.consultarPorDocumento(new Usuario(null, '', this.envio.remitente)).toPromise();
      })
      .then((usuario) => {
        this.remitente = usuario;
        return this.usuarioService.consultarPorDocumento(new Usuario(null, '', this.envio.destinatario)).toPromise();
      })
      .then((usuario) => {
        this.destinatario = usuario;
        this.rastrearEnvioForm.reset();
        this.consultaCompleta = true;
      })
      .catch((e) => {
        this.errorConsultaEnvio.isError = true;
        this.errorConsultaEnvio.titulo = ERROR_CONSULTA;
        this.errorConsultaEnvio.mensaje = ERROR_ENVIO;
        this.errorConsultaEnvio.descripcion = e.error.mensaje;
        this.rastrearEnvioForm.reset();
      });
  }

  resetear(): void {
    this.consultaCompleta = false;
    this.envio = null;
    this.remitente = null;
    this.destinatario = null;
  }

  construirFormularioConsultarGuia(): void {
    this.rastrearEnvioForm = new FormGroup({
      idEnvio: new FormControl('', [Validators.required])
    });
  }

}
