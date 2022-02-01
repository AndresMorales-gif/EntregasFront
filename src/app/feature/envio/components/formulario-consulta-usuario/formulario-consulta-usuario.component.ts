import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Error } from '@core/modelo/error';
import { Usuario } from '@core/modelo/usuario';
import { UsuarioService } from '@core/services/usuario.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 6;
const ERROR_CONSULTA = 'Error al realizar la consulta';
const ERROR_USUARIO = 'Error al consultar el $usuario';

@Component({
  selector: 'app-formulario-consulta-usuario',
  templateUrl: './formulario-consulta-usuario.component.html',
  styleUrls: ['./formulario-consulta-usuario.component.css']
})
export class FormularioConsultaUsuarioComponent implements OnInit, OnChanges {
  consultarUsuarioForm: FormGroup;
  errorConsultaremitente: Error;
  @Input()
  propiedad: string;
  @Input()
  tituloBoton = 'Consultar';
  @Input()
  texto: string;
  @Input()
  textoUsuario = 'usuario';
  @Input()
  idDocumento: string;
  @Input()
  noEditable = false;
  @Output()
  consultaTerminada: EventEmitter<Usuario> = new EventEmitter();

  constructor(protected usuarioService: UsuarioService) {
    this.errorConsultaremitente = new Error();
  }

  ngOnInit(): void {
    this.construirFormularioConsultarUsuario();
  }

  ngOnChanges(): void {
    if (this.consultarUsuarioForm && this.idDocumento) {
      this.consultarUsuarioForm.controls[this.propiedad].setValue(this.idDocumento);
    }
  }

  construirFormularioConsultarUsuario(): void {
    this.consultarUsuarioForm = new FormGroup({
      [this.propiedad]: new FormControl(this.idDocumento ? this.idDocumento : '',
        [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }

  consultarUsuario(): Promise<void> {
    return this.usuarioService.consultarPorDocumento
      ({
        idDocumento: this.consultarUsuarioForm.controls[this.propiedad].value as string,
        id: null, nombre: null
      }).toPromise()
      .then((usuario) => {
        this.errorConsultaremitente.isError = false;
        this.consultaTerminada.emit(usuario);
      })
      .catch((e) => {
        this.errorConsultaremitente.isError = true;
        this.errorConsultaremitente.titulo = ERROR_CONSULTA;
        this.errorConsultaremitente.mensaje = ERROR_USUARIO.replace('$usuario', this.textoUsuario);
        this.errorConsultaremitente.descripcion = e.error.mensaje;
        this.consultarUsuarioForm.reset();
      });
  }

}
