import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 6;
const ERROR_CONSULTA = "Error al realizar la consulta";
const ERROR_USUARIO = "Error al consultar el $usuario";

@Component({
  selector: 'app-formulario-consulta-usuario',
  templateUrl: './formulario-consulta-usuario.component.html',
  styleUrls: ['./formulario-consulta-usuario.component.css']
})
export class FormularioConsultaUsuarioComponent implements OnInit {
  consultarUsuarioForm: FormGroup;
  errorConsultaremitente: Error;
  @Input()
  texto: string;
  @Input()
  textoUsuario:string = "usuario";
  @Output()
  consultaTerminada: EventEmitter<Usuario> = new EventEmitter();

  constructor(protected usuarioService: UsuarioService) { 
    this.errorConsultaremitente = new Error();
  }

  ngOnInit(): void {
    this.construirFormularioConsultarUsuario();
  }

  construirFormularioConsultarUsuario() {
    this.consultarUsuarioForm = new FormGroup({
      idDocumento: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }

  consultarUsuario() {
    if (this.consultarUsuarioForm.valid) {
      this.usuarioService.consultarPorDocumento(this.consultarUsuarioForm.value).toPromise()
        .then((usuario) => {          
          this.errorConsultaremitente.isError = false;
          this.consultaTerminada.emit(usuario);
        })
        .catch((e) => {
          this.errorConsultaremitente.isError = true;
          this.errorConsultaremitente.titulo = ERROR_CONSULTA;
          this.errorConsultaremitente.mensaje = ERROR_USUARIO.replace("$usuario", this.textoUsuario);
          this.errorConsultaremitente.descripcion = e.error.mensaje;
          this.consultarUsuarioForm.reset();
        });
    }
  }

}
