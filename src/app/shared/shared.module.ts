import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposDirective } from './directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackByPipe } from './pipe/track-by.pipe';
import { BotonAccionComponent } from './components/boton-accion/boton-accion.component';
import { ErrorComponent } from './components/error/error.component';
import { UsuarioInformacionComponent } from './components/usuario-informacion/usuario-informacion.component';
import { InputFormularioComponent } from './components/input-formulario/input-formulario.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe,
    BotonAccionComponent,
    ErrorComponent,
    UsuarioInformacionComponent,
    InputFormularioComponent
  ],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    BotonAccionComponent,
    ErrorComponent,
    UsuarioInformacionComponent,
    InputFormularioComponent
  ]
})
export class SharedModule { }
