import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEnvioComponent } from './crear-envio.component';

describe('CrearEnvioComponent', () => {
  let component: CrearEnvioComponent;
  let fixture: ComponentFixture<CrearEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
