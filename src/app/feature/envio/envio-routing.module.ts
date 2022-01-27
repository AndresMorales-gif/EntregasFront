import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEnvioComponent } from './components/crear-envio/crear-envio.component';
import { EditarEnvioComponent } from './components/editar-envio/editar-envio.component';
import { EnvioComponent } from './components/envio/envio.component';
import { ListarEnvioComponent } from './components/listar-envio/listar-envio.component';

const routes: Routes = [
    {
        path: '',
        component: EnvioComponent,
        children: [
            {
                path: 'listar',
                component: ListarEnvioComponent
            },
            {
                path: 'crear',
                component: CrearEnvioComponent
            },
            {
                path: 'editar/:id',
                component: EditarEnvioComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EnvioRoutingModule { }
