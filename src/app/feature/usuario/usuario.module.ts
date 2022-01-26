import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from './shared/service/usuario.service';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    CrearUsuarioComponent
  ],
  imports: [
    UsuarioRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [UsuarioService]
})
export class UsuarioModule { }
