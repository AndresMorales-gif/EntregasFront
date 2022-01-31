import { Component, OnInit } from '@angular/core';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';

@Component({
  selector: 'app-crear-envio',
  templateUrl: './crear-envio.component.html',
  styleUrls: ['./crear-envio.component.css']
})
export class CrearEnvioComponent implements OnInit {
  esCompleto = false;
  envio: Envio;

  constructor(protected envioService: EnvioService) { }

  ngOnInit(): void {
  }

  creacionCompleta(id: number): Promise<void> {
    return this.envioService.consultarEnvioPorId(id).toPromise().then(envio => {
      this.envio = envio;
      this.cambiarEsCompleto();
    });
  }

  cambiarEsCompleto(): void {
    this.esCompleto = !this.esCompleto;
  }

}
