import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Usuario } from '@core/modelo/usuario';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@core/services/usuario.service';
import { Envio } from '@core/modelo/envio';
import { of, throwError } from 'rxjs';

import { RastrearComponent } from './rastrear.component';
import { EnvioConsultaService } from '@core/services/envio-consulta.service';

describe('RastrearComponent', () => {
  let component: RastrearComponent;
  let fixture: ComponentFixture<RastrearComponent>;
  let envioConsultarService: EnvioConsultaService;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [RastrearComponent],
      providers: [EnvioConsultaService, UsuarioService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RastrearComponent);
    component = fixture.componentInstance;
    envioConsultarService = TestBed.inject(EnvioConsultaService);
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(envioConsultarService, 'consultarEnvioPorId').and.callFake((id: number) => {
      if (id === 1) {
        return of(new Envio(1, '123456', '123457', 1, true, 15, new Date(), 195, new Date()));
      }
      return throwError({ error: { mensaje: 'error test' } });
    }
    );
    spyOn(usuarioService, 'consultarPorDocumento').and.callFake((usuario: Usuario) => {
      if (usuario.idDocumento === '123456') {
        return of(new Usuario(1, 'usuario test', '123456'));
      }
      return of(new Usuario(2, 'usuario test 2', '123457'));
    }
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia rastrear envio', waitForAsync(() => {
    component.rastrearEnvioForm.controls.idEnvio.setValue(1);
    expect(component.consultaCompleta).toBeFalse();
    component.consultarEnvio().then(() => {
      expect(component.envio.id).toEqual(1);
      expect(component.remitente.id).toEqual(1);
      expect(component.destinatario.id).toEqual(2);
      expect(component.consultaCompleta).toBeTrue();
      component.resetear();
      expect(component.envio).toBeNull();
      expect(component.remitente).toBeNull();
      expect(component.destinatario).toBeNull();
      expect(component.consultaCompleta).toBeFalse();
    });
  }));

  it('Deberia fallar al rastrear envio', waitForAsync(() => {
    component.rastrearEnvioForm.controls.idEnvio.setValue(2);
    expect(component.consultaCompleta).toBeFalse();
    component.consultarEnvio().then(() => {
      expect(component.errorConsultaEnvio.isError).toBeTrue();
      expect(component.errorConsultaEnvio.descripcion).toEqual('error test');
    });
  }));
});
