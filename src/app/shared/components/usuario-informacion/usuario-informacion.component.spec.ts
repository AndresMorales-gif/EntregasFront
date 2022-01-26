import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInformacionComponent } from './usuario-informacion.component';

describe('UsuarioInformacionComponent', () => {
  let component: UsuarioInformacionComponent;
  let fixture: ComponentFixture<UsuarioInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
