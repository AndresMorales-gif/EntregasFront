import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '@usuario/shared/model/usuario';

@Component({
  selector: 'app-usuario-informacion',
  templateUrl: './usuario-informacion.component.html',
  styleUrls: ['./usuario-informacion.component.css']
})
export class UsuarioInformacionComponent implements OnInit {

  @Input()
  usuario: Usuario;
  @Input()
  bienvenida: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
