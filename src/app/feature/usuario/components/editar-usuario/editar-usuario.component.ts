import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  idDocumento: string;

  constructor(protected usuarioService: UsuarioService, private _activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this._activeRouter.params.subscribe((params: Params) => {
      this.idDocumento = params.id;
    });
  } 

}
