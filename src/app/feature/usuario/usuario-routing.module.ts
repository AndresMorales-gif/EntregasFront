import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";

const routes: Routes = [
    {
      path: 'crear',
      component: CrearUsuarioComponent,
      
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsuarioRoutingModule { }