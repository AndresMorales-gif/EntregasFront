import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Usuario } from '@core/modelo/usuario';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@core/services/usuario.service';
import { Envio } from '@core/modelo/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { of } from 'rxjs';

import { ListarEnvioComponent } from './listar-envio.component';

const REMITENTE = '123456';

const MONCK_LISTA_ENVIOS = {
  pendientes: [
    new Envio(1, REMITENTE, '123457', 1, false, 15, new Date(), 150, new Date()),
    new Envio(1, REMITENTE, '123457', 4, true, 15, new Date(), 195, new Date()),
    new Envio(1, REMITENTE, '123458', 1, false, 11, new Date(), 110, new Date())
  ],
  enProceso: [
    new Envio(1, REMITENTE, '123454', 2, false, 90, new Date(), 900, new Date()),
    new Envio(1, REMITENTE, '123459', 3, true, 30, new Date(), 390, new Date())
  ],
  historico: [
    new Envio(1, REMITENTE, '123452', 2, true, 25, new Date(), 325, new Date())
  ]
};

const PENDIENTE = '1';
const EN_PROCESO = '2';
const HISTORICO = '3';

describe('ListarEnvioComponent', () => {
  let component: ListarEnvioComponent;
  let fixture: ComponentFixture<ListarEnvioComponent>;
  let envioService: EnvioService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarEnvioComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [EnvioService, HttpService, UsuarioService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEnvioComponent);
    component = fixture.componentInstance;
    envioService = TestBed.inject(EnvioService);
    router = TestBed.inject(Router);
    spyOn(envioService, 'consultarEnvios').and.callFake((idDocumento, tipoConsulta) => {
      if (idDocumento !== REMITENTE) {
        return of([]);
      }
      if (tipoConsulta === PENDIENTE) {
        return of(MONCK_LISTA_ENVIOS.pendientes);
      }
      if (tipoConsulta === EN_PROCESO) {
        return of(MONCK_LISTA_ENVIOS.enProceso);
      }
      return of(MONCK_LISTA_ENVIOS.historico);
    });
    spyOn(envioService, 'eliminarEnvio').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia consultar envios pendientes', waitForAsync(() => {
    component.consultarUsuarioTerminado(new Usuario(1, 'testRemitente', REMITENTE));
    component.consultarEnvios(PENDIENTE).then(() => {
      expect(component.envios.length).toEqual(3);
      expect(component.esEditable).toBeTrue();
      expect(component.consultaEnvios).toBeTrue();
    });
  }));

  it('Deberia consultar envios en proceso', waitForAsync(() => {
    component.consultarUsuarioTerminado(new Usuario(1, 'testRemitente', REMITENTE));
    component.consultarEnvios(EN_PROCESO).then(() => {
      expect(component.envios.length).toEqual(2);
      expect(component.esEditable).toBeFalse();
      expect(component.consultaEnvios).toBeTrue();
    });
  }));

  it('Deberia consultar envios historico', waitForAsync(() => {
    component.consultarUsuarioTerminado(new Usuario(1, 'testRemitente', REMITENTE));
    component.consultarEnvios(HISTORICO).then(() => {
      expect(component.envios.length).toEqual(1);
      expect(component.esEditable).toBeFalse();
      expect(component.consultaEnvios).toBeTrue();
    });
  }));

  it('Deberia consultar envios vacio', waitForAsync(() => {
    component.consultarUsuarioTerminado(new Usuario(1, 'testRemitente', '123457'));
    component.consultarEnvios(PENDIENTE).then(() => {
      expect(component.envios.length).toEqual(0);
      expect(component.consultaEnvios).toBeTrue();
    });
  }));

  it('Deberia abrir el modal para eliminar y eliminar el envio', waitForAsync(() => {
    component.accionEliminarModal(1);
    component.remitente = new Usuario(1, 'testRemitente', REMITENTE);
    expect(component.modalEliminar).toBeTrue();
    expect(component.idAccion).toEqual(1);
    component.accionEliminar().then(() => {
      expect(component.modalEliminar).toBeFalse();
      expect(component.idAccion).toBeNull();
    });
  }));

  it('called create', () => {
    const navigateByUrl = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    component.accionModificar(1);
    expect(navigateByUrl).toHaveBeenCalledWith('envio/editar/1');
  });

});
