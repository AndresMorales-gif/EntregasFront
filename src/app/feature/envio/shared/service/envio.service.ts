import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Envio } from '@core/modelo/envio';
import { Zona } from '../model/zona';

@Injectable()
export class EnvioService {
  constructor(protected http: HttpService) { }

  public consultarZonas() {
    return this.http.doGet<Zona[]>(`${environment.endpoint}/zonas`,
      this.http.optsName('consultar zonas'));
  }

  public consultarEnvios(idDocumento: string, tipoConsulta: string) {
    return this.http.doGetParameters<Envio[]>(`${environment.endpoint}/envios/usuario/${idDocumento}`,
      new HttpParams().set('consulta', tipoConsulta),
      this.http.optsName('consultar envios'));
  }

  public crearEnvio(envio: Envio) {
    return this.http.doPost<Envio, Respuesta>(`${environment.endpoint}/envios`,
      envio,
      this.http.optsName('crear envio'));
  }

  public actualizarEnvio(envio: Envio) {
    return this.http.doPut<Envio, void>(`${environment.endpoint}/envios/${envio.id}`,
      envio,
      this.http.optsName('actualizar envio'));
  }

  public eliminarEnvio(id: number) {
    return this.http.doDelete<void>(`${environment.endpoint}/envios/${id}`,
      this.http.optsName('Eliminar envio'));
  }
}
