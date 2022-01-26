import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Envio } from "../model/envio";

@Injectable()
export class EnvioService {
    constructor(protected http: HttpService) {}

  public consultarEnvios(idDocumento: string, tipoConsulta: string) {
    return this.http.doGetParameters<Envio[]>(`${environment.endpoint}/envios/usuario/${idDocumento}`,
                new HttpParams().set('consulta', tipoConsulta),
                this.http.optsName('consultar envios'));
  }
}