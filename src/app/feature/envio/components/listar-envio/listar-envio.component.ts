import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { EnvioService } from '@envio/shared/service/envio.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 6;
const ERROR_CONSULTA = "Error al realizar la consulta";
const ERROR_REMITENTE = "Error al consultar el remitente";

@Component({
  selector: 'app-listar-envio',
  templateUrl: './listar-envio.component.html',
  styleUrls: ['./listar-envio.component.css']
})
export class ListarEnvioComponent implements OnInit {
  consultarUsuarioForm: FormGroup;
  remitente: Usuario;
  errorConsultaremitente: Error;
  errorListarEnvios: Error;

  constructor(protected envioService: EnvioService, protected usuarioService: UsuarioService) {
    this.errorConsultaremitente = new Error();
    this.errorListarEnvios = new Error();
  }

  consultarUsuario() {
    if (this.consultarUsuarioForm.valid) {
      this.usuarioService.consultarPorDocumento(this.consultarUsuarioForm.value).toPromise()
        .then((usuario) => {
          this.remitente = usuario;
          this.errorConsultaremitente.isError = false;
        })
        .catch((e) => {
          this.errorConsultaremitente.isError = true;
          this.errorConsultaremitente.titulo = ERROR_CONSULTA;
          this.errorConsultaremitente.mensaje = ERROR_REMITENTE;
          this.errorConsultaremitente.descripcion = e.error.mensaje;
          this.consultarUsuarioForm.reset();
        });
    }
  }

  consultarEnvios(tipoConsulta: string) {
    this.envioService.consultarEnvios(this.remitente.idDocumento, tipoConsulta).toPromise()
        .then((envios) => console.log(envios));
  }

  ngOnInit(): void {
    this.construirFormularioConsultarUsuario();
  }

  construirFormularioConsultarUsuario() {
    this.consultarUsuarioForm = new FormGroup({
      idDocumento: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }

}
