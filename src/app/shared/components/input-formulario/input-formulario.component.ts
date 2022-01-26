import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-formulario',
  templateUrl: './input-formulario.component.html',
  styleUrls: ['./input-formulario.component.css']
})
export class InputFormularioComponent implements OnInit {

  @Input()
  texto: string;
  @Input()
  placeholder: string;
  @Input()
  propiedad: string;
  @Input() 
  grupo: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
