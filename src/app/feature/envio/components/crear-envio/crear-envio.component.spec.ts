import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { EnvioRoutingModule } from '@envio/envio-routing.module';
import { Envio } from '@core/modelo/envio';
import { of } from 'rxjs';

import { CrearEnvioComponent } from './crear-envio.component';
import { EnvioConsultaService } from '@core/services/envio-consulta.service';

describe('CrearEnvioComponent', () => {
  let component: CrearEnvioComponent;
  let fixture: ComponentFixture<CrearEnvioComponent>;
  let envioConsultaService: EnvioConsultaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEnvioComponent],
      imports: [HttpClientModule, EnvioRoutingModule],
      providers: [EnvioConsultaService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEnvioComponent);
    component = fixture.componentInstance;
    envioConsultaService = TestBed.inject(EnvioConsultaService);
    spyOn(envioConsultaService, 'consultarEnvioPorId').and.returnValue(
      of(new Envio(1, '123456', '123457', 1, true, 15, new Date(), 195, new Date()))
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', waitForAsync(() => {
    expect(component.esCompleto).toBeFalse();
    component.creacionCompleta(1).then(() => {
      expect(component.esCompleto).toBeTrue();
    });
  }));

});
