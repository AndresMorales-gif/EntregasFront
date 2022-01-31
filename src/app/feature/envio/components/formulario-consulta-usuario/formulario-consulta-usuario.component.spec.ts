import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Usuario } from '@core/modelo/usuario';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@core/services/usuario.service';
import { of, throwError } from 'rxjs';

import { FormularioConsultaUsuarioComponent } from './formulario-consulta-usuario.component';

describe('FormularioConsultaUsuarioComponent', () => {
  let component: FormularioConsultaUsuarioComponent;
  let fixture: ComponentFixture<FormularioConsultaUsuarioComponent>;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FormularioConsultaUsuarioComponent],
      providers: [UsuarioService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioConsultaUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', waitForAsync(() => {
    const usuarioDummy = new Usuario(1, 'usuario Test', '123456');
    component.idDocumento = '123456';
    spyOn(component.consultaTerminada, 'emit');
    spyOn(usuarioService, 'consultarPorDocumento').and.returnValue(
      of(usuarioDummy)
    );

    component.consultarUsuario().then(() => {
      expect(component.consultaTerminada.emit).toHaveBeenCalledWith(usuarioDummy);
    });
  }));

  it('should create', waitForAsync(() => {
    component.idDocumento = '123456';
    spyOn(component.consultaTerminada, 'emit');
    spyOn(usuarioService, 'consultarPorDocumento').and.returnValue(
      throwError({ error: { mensaje: 'errorTest' } })
    );

    component.consultarUsuario().then(() => {
      expect(component.errorConsultaremitente.isError).toBeTrue();
      expect(component.errorConsultaremitente.descripcion).toEqual('errorTest');
    });
  }));
});
