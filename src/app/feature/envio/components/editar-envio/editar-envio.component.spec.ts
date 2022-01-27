import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEnvioComponent } from './editar-envio.component';

describe('EditarEnvioComponent', () => {
  let component: EditarEnvioComponent;
  let fixture: ComponentFixture<EditarEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
