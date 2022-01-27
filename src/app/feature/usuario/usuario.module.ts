import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from '../../core/services/usuario.service';
import { SharedModule } from '@shared/shared.module';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';



@NgModule({
  declarations: [
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    FormularioUsuarioComponent
  ],
  imports: [
    UsuarioRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [UsuarioService]
})
export class UsuarioModule { }
