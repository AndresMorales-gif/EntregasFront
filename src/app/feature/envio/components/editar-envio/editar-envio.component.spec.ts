import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { of } from 'rxjs';

import { EditarEnvioComponent } from './editar-envio.component';

describe('EditarEnvioComponent', () => {
  let component: EditarEnvioComponent;
  let fixture: ComponentFixture<EditarEnvioComponent>;
  let envioService: EnvioService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEnvioComponent],
      imports: [HttpClientModule],
      providers: [EnvioService, HttpService,
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
