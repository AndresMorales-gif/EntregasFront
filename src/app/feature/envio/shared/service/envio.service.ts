import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Envio } from "../model/envio";

@Injectable()
export class EnvioService {
    constructor(protected http: HttpService) {}

  public consultar(idDocumento: string) {
    return this.http.doGet<Envio[]>(`${environment.endpoint}/envios/usuario/${idDocumento}`, 
                this.http.optsName('consultar envios'));
  }
}