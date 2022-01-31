import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { EnvioRoutingModule } from '@envio/envio-routing.module';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { of } from 'rxjs';

import { CrearEnvioComponent } from './crear-envio.component';

describe('CrearEnvioComponent', () => {
  let component: CrearEnvioComponent;
  let fixture: ComponentFixture<CrearEnvioComponent>;
  let envioService: EnvioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEnvioComponent],
      imports: [HttpClientModule, EnvioRoutingModule],
      providers: [EnvioService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEnvioComponent);
    component = fixture.componentInstance;
    envioService = TestBed.inject(EnvioService);
    spyOn(envioService, 'consultarEnvioPorId').and.returnValue(
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
