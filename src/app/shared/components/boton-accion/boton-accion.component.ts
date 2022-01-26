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
  desactivado: boolean = false;
  @Input()
  tipoSubmit: boolean = false;
  @Output()
  accion: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onclick() {
    console.log("seguimos aca")
    if (!this.desactivado && !this.tipoSubmit) {
      this.accion.emit();
    }
  }

}
