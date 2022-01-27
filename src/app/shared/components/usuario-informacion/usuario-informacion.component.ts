import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '@core/modelo/usuario';

@Component({
  selector: 'app-usuario-informacion',
  templateUrl: './usuario-informacion.component.html',
  styleUrls: ['./usuario-informacion.component.css']
})
export class UsuarioInformacionComponent implements OnInit {

  @Input()
  usuario: Usuario;
  @Input()
  bienvenida = false;

  constructor() { }

  ngOnInit(): void {
  }

}
