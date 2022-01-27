import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConsultaUsuarioComponent } from './formulario-consulta-usuario.component';

describe('FormularioConsultaUsuarioComponent', () => {
  let component: FormularioConsultaUsuarioComponent;
  let fixture: ComponentFixture<FormularioConsultaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioConsultaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioConsultaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
