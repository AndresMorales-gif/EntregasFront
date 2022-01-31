import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { Respuesta } from '@core/modelo/respuesta';
import { Usuario } from '@core/modelo/usuario';
import { UsuarioService } from '@core/services/usuario.service';
import { Observable } from 'rxjs';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 6;
const LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE = 2;
const ERROR_AL_ACCION_USUARIO = 'Error al $accion un usuario';
const CREAR = 'crear';
const ACTUALIZAR = 'actualizar';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {
  formularioUsuarioForm: FormGroup;
  usuarioCreado = false;
  errorUsuarioFormulario: Error;
  usuario: Usuario;
  @Input()
  actualizar = false;
  @Input()
  idDocumento: string;

  constructor(protected usuarioService: UsuarioService) {
    this.errorUsuarioFormulario = new Error();
  }

  ngOnInit(): void {
    if (this.actualizar) {
      this.consultarUsuario();
    } else {
      this.construirFormularioCrearUsuario();
    }
  }

  consultarUsuario(): Promise<void> {
    return this.usuarioService.consultarPorDocumento(new Usuario(null, '', this.idDocumento)).toPromise()
      .then((usuario) => {
        this.usuario = usuario;
        this.construirFormularioCrearUsuario();
      });
  }

  construirFormularioCrearUsuario(): void {
    this.formularioUsuarioForm = new FormGroup({
      nombre: new FormControl(this.usuario?.nombre, [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE)]),
      idDocumento: new FormControl(this.usuario?.idDocumento, [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }

  accionFormularioEnvio(): Promise<void> {
    if (this.actualizar) {
      return this.respuestaAccion(this.usuarioService
        .actualizarUsuario({ ...this.formularioUsuarioForm.value, id: this.usuario.id }),
        ACTUALIZAR);
    } else {
      return this.respuestaAccion(this.usuarioService
        .crearUsuario(this.formularioUsuarioForm.value),
        CREAR);
    }
  }

  respuestaAccion(accion: Observable<Respuesta | void>, mensaje: string): Promise<void> {
    return accion.toPromise().then(() => {
      this.usuarioCreado = true;
    })
      .catch(e => {
        this.errorUsuarioFormulario.isError = true;
        this.errorUsuarioFormulario.titulo = ERROR_AL_ACCION_USUARIO.replace('$accion', mensaje);
        this.errorUsuarioFormulario.mensaje = ERROR_AL_ACCION_USUARIO.replace('$accion', mensaje);
        this.errorUsuarioFormulario.descripcion = e.error.mensaje;
      });
  }

  resetear(): void {
    this.formularioUsuarioForm.reset();
    this.usuarioCreado = false;
    this.errorUsuarioFormulario.isError = false;
  }

}
