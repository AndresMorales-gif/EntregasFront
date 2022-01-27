import { NgModule } from '@angular/core';
import { RastrearComponent } from './components/rastrear/rastrear.component';
import { RastrearRoutingModule } from './rastrear-routing.module';
import { EnvioService } from '@envio/shared/service/envio.service';
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from '@core/services/usuario.service';



@NgModule({
  declarations: [
    RastrearComponent
  ],
  imports: [
    SharedModule,
    RastrearRoutingModule
  ],
  providers: [EnvioService, UsuarioService]
})
export class RastrearModule { }
