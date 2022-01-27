import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RastrearComponent } from './components/rastrear/rastrear.component';


const routes: Routes = [
  {
    path: '',
    component: RastrearComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RastrearRoutingModule { }
