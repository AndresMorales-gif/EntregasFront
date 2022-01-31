import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Respuesta } from '@core/modelo/respuesta';
import { Usuario } from '@core/modelo/usuario';
import { HttpService } from '@core/services/http.service';
import { Envio } from '@envio/shared/model/envio';
import { Zona } from '@envio/shared/model/zona';
import { EnvioService } from '@envio/shared/service/envio.service';
import { of, throwError } from 'rxjs';

import { FormularioEnvioComponent } from './formulario-envio.component';

describe('FormularioEnvioComponent', () => {
  let component: FormularioEnvioComponent;
  let fixture: ComponentFixture<FormularioEnvioComponent>;
  let envioService: EnvioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioEnvioComponent],
      imports: [HttpClientModule],
      providers: [EnvioService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEnvioComponent);
    component = fixture.componentInstance;
    envioService = TestBed.inject(EnvioService);
    spyOn(envioService, 'consultarZonas').and.returnValue(of([new Zona(1, 'zonaTest', 3)]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should updated', waitForAsync(() => {
    component.actualizar = true;
    component.idEnvio = 1;
    component.remitente = new Usuario(1, 'testRemitente', '123456');
    component.destinatario = new Usuario(2, 'testDestinatario', '123457');
    spyOn(component.completo, 'emit');
    spyOn(envioService, 'consultarEnvioPorId').and.returnValue(
      of(new Envio(1, '123456', '123457', 1, true, 15, new Date(), 195, new Date()))
    );
    spyOn(envioService, 'actualizarEnvio').and.returnValue(of());
    component.consultarEnvio().then(() => {
      expect(component.envio.id).toEqual(1);
      expect(component.envio.remitente).toEqual('123456');
      expect(component.envio.precio).toEqual(195);
      return component.accionFormularioEnvio();
    })
      .then(() => {
        expect(component.completo.emit).toHaveBeenCalledWith(1);
      });
  }));

  it('should updated', waitForAsync(() => {
    component.construirFormularioEnvio();
    component.consultarRemitenteTerminado(new Usuario(1, 'testRemitente', '123456'));
    component.consultarDestinatarioTerminado(new Usuario(2, 'testDestinatario', '123457'));
    spyOn(component.completo, 'emit');
    spyOn(envioService, 'crearEnvio').and.returnValue(of(new Respuesta(2)));
    component.accionFormularioEnvio().then(() => {
      expect(component.completo.emit).toHaveBeenCalledWith(2);
    });
  }));

  it('should updated', waitForAsync(() => {
    component.construirFormularioEnvio();
    component.consultarRemitenteTerminado(new Usuario(1, 'testRemitente', '123456'));
    component.consultarDestinatarioTerminado(new Usuario(2, 'testDestinatario', '123457'));
    spyOn(component.completo, 'emit');
    spyOn(envioService, 'crearEnvio').and.returnValue(throwError({ error: { mensaje: 'errorTest' } }));
    component.accionFormularioEnvio().then(() => {
      expect(component.errorFormularioEnvio.isError).toBeTrue();
      expect(component.errorFormularioEnvio.descripcion).toEqual('errorTest');
    });
  }));

});
