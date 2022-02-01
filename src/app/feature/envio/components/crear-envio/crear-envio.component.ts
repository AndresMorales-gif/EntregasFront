import { Component, OnInit } from '@angular/core';
import { Envio } from '@core/modelo/envio';
import { EnvioConsultaService } from '@core/services/envio-consulta.service';

@Component({
  selector: 'app-crear-envio',
  templateUrl: './crear-envio.component.html',
  styleUrls: ['./crear-envio.component.css']
})
export class CrearEnvioComponent implements OnInit {
  esCompleto = false;
  envio: Envio;

  constructor(protected envioConsultaService: EnvioConsultaService) { }

  ngOnInit(): void {
  }

  creacionCompleta(id: number): Promise<void> {
    return this.envioConsultaService.consultarEnvioPorId(id).toPromise().then(envio => {
      this.envio = envio;
      this.cambiarEsCompleto();
    });
  }

  cambiarEsCompleto(): void {
    this.esCompleto = !this.esCompleto;
  }

}
