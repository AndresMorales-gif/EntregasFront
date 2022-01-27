import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { EnvioComponent } from "./components/envio/envio.component";
import { EnvioRoutingModule } from "./envio-routing.module";
import { ListarEnvioComponent } from './components/listar-envio/listar-envio.component';
import { CrearEnvioComponent } from './components/crear-envio/crear-envio.component';
import { EnvioService } from "./shared/service/envio.service";
import { UsuarioService } from "@usuario/shared/service/usuario.service";
import { FormularioEnvioComponent } from './components/formulario-envio/formulario-envio.component';
import { FormularioConsultaUsuarioComponent } from './components/formulario-consulta-usuario/formulario-consulta-usuario.component';

@NgModule({
    declarations: [
        EnvioComponent,
        ListarEnvioComponent,
        CrearEnvioComponent,
        FormularioEnvioComponent,
        FormularioConsultaUsuarioComponent
    ],
    imports: [
        EnvioRoutingModule,
        SharedModule
    ],
    providers: [EnvioService, UsuarioService]
})
export class EnvioModule { }
