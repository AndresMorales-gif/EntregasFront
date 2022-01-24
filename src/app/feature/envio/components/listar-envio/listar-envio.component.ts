import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnvioService } from '@envio/shared/service/envio.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 6;

@Component({
  selector: 'app-listar-envio',
  templateUrl: './listar-envio.component.html',
  styleUrls: ['./listar-envio.component.css']
})
export class ListarEnvioComponent implements OnInit {
  consultarUsuarioForm: FormGroup;
  remitente: Usuario;

  constructor(protected envioService: EnvioService, protected usuarioService: UsuarioService) { }

  consultarUsuario() {
    if (this.consultarUsuarioForm.valid) {
      this.usuarioService.consultarPorDocumento(this.consultarUsuarioForm.value).toPromise()
        .then((data) => console.log(data))
        .catch(e => console.log(e));
    }
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
