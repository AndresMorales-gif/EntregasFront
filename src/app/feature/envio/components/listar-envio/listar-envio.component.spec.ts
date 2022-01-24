import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEnvioComponent } from './listar-envio.component';

describe('ListarEnvioComponent', () => {
  let component: ListarEnvioComponent;
  let fixture: ComponentFixture<ListarEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
