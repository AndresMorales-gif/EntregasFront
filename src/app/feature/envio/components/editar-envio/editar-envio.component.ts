import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';

@Component({
  selector: 'app-editar-envio',
  templateUrl: './editar-envio.component.html',
  styleUrls: ['./editar-envio.component.css']
})
export class EditarEnvioComponent implements OnInit {
  esCompleto = false;
  envio: Envio;
  idEnvio: number;

  constructor(protected envioService: EnvioService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idEnvio = params.id;
    });
  }

  creacionCompleta(id: number): void {
    this.envioService.consultarEnvioPorId(id).toPromise().then(envio => {
      this.envio = envio;
      this.cambiarEsCompleto();
    });
  }

  cambiarEsCompleto(): void {
    this.esCompleto = !this.esCompleto;
  }

}
