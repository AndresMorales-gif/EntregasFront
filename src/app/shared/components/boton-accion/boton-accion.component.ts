import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boton-accion',
  templateUrl: './boton-accion.component.html',
  styleUrls: ['./boton-accion.component.css']
})
export class BotonAccionComponent implements OnInit {

  @Input()
  titulo: string;
  @Input()
  desactivado = false;
  @Input()
  lleno = true;
  @Input()
  tipoSubmit = false;
  @Output()
  accion: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onclick() {
    if (!this.desactivado && !this.tipoSubmit) {
      this.accion.emit();
    }
  }

}
