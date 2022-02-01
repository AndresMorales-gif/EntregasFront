import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Envio } from '@core/modelo/envio';

@Injectable()
export class EnvioConsultaService {
  constructor(protected http: HttpService) { }

  public consultarEnvioPorId(id: number) {
    return this.http.doGet<Envio>(`${environment.endpoint}/envios/${id}`,
      this.http.optsName('consultar envios'));
  }
}
