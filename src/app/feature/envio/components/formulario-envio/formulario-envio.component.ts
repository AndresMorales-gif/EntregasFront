import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { Zona } from '@envio/shared/model/zona';
import { Envio } from '@core/modelo/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { Observable } from 'rxjs';
import { Usuario } from '@core/modelo/usuario';
import { Respuesta } from '@core/modelo/respuesta';
import { EnvioConsultaService } from '@core/services/envio-consulta.service';

const ERROR_ACCION = 'Error al ejecutar la accion';
const ERROR_AL_CREAR = 'Error al crear el envio';
const ERROR_AL_ACTUALIZAR = 'Error al actualizar el envio';

@Component({
  selector: 'app-formulario-envio',
  templateUrl: './formulario-envio.component.html',
  styleUrls: ['./formulario-envio.component.css']
})
export class FormularioEnvioComponent implements OnInit {
  formularioEnvioForm: FormGroup;
  envioPlus: AbstractControl;
  errorFormularioEnvio: Error;
  remitente: Usuario;
  destinatario: Usuario;
  zonas: Zona[] = [];
  envio: Envio;
  idRemitente: string;
  idDestinatario: string;
  @Input()
  idEnvio: number;
  @Input()
  actualizar = false;
  @Output()
  completo: EventEmitter<number> = new EventEmitter();

  constructor(protected envioService: EnvioService, private envioConsultaService: EnvioConsultaService) {
    this.errorFormularioEnvio = new Error();
  }

  ngOnInit(): void {
    this.consultarZonas();

  }

  consultarEnvio(): Promise<void> {
    return this.envioConsultaService.consultarEnvioPorId(this.idEnvio).toPromise().then((envio) => {
      this.envio = envio;
      this.idRemitente = envio.remitente;
      this.idDestinatario = envio.destinatario;
      this.construirFormularioEnvio();
    });
  }

  consultarZonas(): Promise<void> {
    return this.envioService.consultarZonas().toPromise().then(zonas => {
      this.zonas = zonas;
      if (this.actualizar) {
        this.consultarEnvio();
      } else {
        this.construirFormularioEnvio();
      }
    });
  }

  consultarRemitenteTerminado(usuario: Usuario) {
    this.remitente = usuario;
  }

  consultarDestinatarioTerminado(usuario: Usuario) {
    this.destinatario = usuario;
  }

  construirFormularioEnvio(): void {
    this.formularioEnvioForm = new FormGroup({
      zona: new FormControl(this.envio?.zona, [Validators.required]),
      pesoCarga: new FormControl(this.envio?.pesoCarga, [Validators.required])
    });
    this.envioPlus = new FormControl(this.envio ? this.envio.envioPlus : false);
    this.formularioEnvioForm.setControl('envioPlus', this.envioPlus);
  }

  accionFormularioEnvio(): Promise<void> {
    if (this.actualizar) {
      return this.respuestaAccion(this.envioService.actualizarEnvio
        ({
          ...this.formularioEnvioForm.value, remitente: this.remitente.idDocumento,
          destinatario: this.destinatario.idDocumento, id: this.idEnvio
        }), ERROR_AL_ACTUALIZAR);
    }
    return this.respuestaAccion(this.envioService.crearEnvio
      ({
        ...this.formularioEnvioForm.value, remitente: this.remitente.idDocumento,
        destinatario: this.destinatario.idDocumento
      }), ERROR_AL_CREAR);

  }

  respuestaAccion(accion: Observable<Respuesta | void>, mensaje: string): Promise<void> {
    return accion.toPromise().then(respuesta => {
      this.errorFormularioEnvio.isError = false;
      this.formularioEnvioForm.reset();
      this.remitente = null;
      this.destinatario = null;
      if (!respuesta) {
        this.completo.emit(this.idEnvio);
      } else {
        this.completo.emit(respuesta.valor);
      }
    })
      .catch(e => {
        this.errorFormularioEnvio.isError = true;
        this.errorFormularioEnvio.titulo = ERROR_ACCION;
        this.errorFormularioEnvio.mensaje = mensaje;
        this.errorFormularioEnvio.descripcion = e.error.mensaje;
      });
  }

}
