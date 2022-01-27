import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      providers: [EnvioService]
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
});
