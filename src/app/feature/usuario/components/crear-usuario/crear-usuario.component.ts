import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 6;
const LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE = 2;
const ERROR_AL_CREAR_USUARIO = "Error al crear un usuario";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  crearUsuarioForm: FormGroup;
  usuarioCreado: boolean = false;
  errorCrearUsuario: Error;

  constructor(protected usuarioService: UsuarioService) {
    this.errorCrearUsuario = new Error();
   }

  ngOnInit(): void {
    this.construirFormularioCrearUsuario();
  }

  construirFormularioCrearUsuario() {
    this.crearUsuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE)]),
      idDocumento: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }

  crearUsuario() {
    if (this.crearUsuarioForm.valid) {
      this.usuarioService.crearUsuario(this.crearUsuarioForm.value).toPromise()
            .then(() => this.usuarioCreado = true)
            .catch(e => {
              this.errorCrearUsuario.isError = true;
              this.errorCrearUsuario.titulo = ERROR_AL_CREAR_USUARIO;
              this.errorCrearUsuario.mensaje = ERROR_AL_CREAR_USUARIO;
              this.errorCrearUsuario.descripcion = e.error.mensaje;
              this.crearUsuarioForm.reset();
            });
    }
  }

  crearOtroUsuario() {
    this.errorCrearUsuario.isError = false;
    this.crearUsuarioForm.reset();
    this.usuarioCreado = false;
  }

}
