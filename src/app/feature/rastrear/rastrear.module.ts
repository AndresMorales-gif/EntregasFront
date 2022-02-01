import { NgModule } from '@angular/core';
import { RastrearComponent } from './components/rastrear/rastrear.component';
import { RastrearRoutingModule } from './rastrear-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from '@core/services/usuario.service';
import { EnvioConsultaService } from '@core/services/envio-consulta.service';

@NgModule({
  declarations: [
    RastrearComponent
  ],
  imports: [
    SharedModule,
    RastrearRoutingModule
  ],
  providers: [EnvioConsultaService, UsuarioService]
})
export class RastrearModule { }
