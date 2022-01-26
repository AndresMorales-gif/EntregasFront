import { Component, Input, OnInit } from '@angular/core';
import { Error } from '@core/modelo/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input()
  error: Error;

  constructor() { }

  ngOnInit(): void {
  }

}
