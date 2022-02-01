import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { Envio } from '@core/modelo/envio';
import { of } from 'rxjs';

import { EditarEnvioComponent } from './editar-envio.component';
import { EnvioConsultaService } from '@core/services/envio-consulta.service';

describe('EditarEnvioComponent', () => {
  let component: EditarEnvioComponent;
  let fixture: ComponentFixture<EditarEnvioComponent>;
  let envioConsultaService: EnvioConsultaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEnvioComponent],
      imports: [HttpClientModule],
      providers: [EnvioConsultaService, HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEnvioComponent);
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
