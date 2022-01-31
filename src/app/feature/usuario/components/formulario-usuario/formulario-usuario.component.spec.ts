import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Respuesta } from '@core/modelo/respuesta';
import { Usuario } from '@core/modelo/usuario';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@core/services/usuario.service';
import { of, throwError } from 'rxjs';

import { FormularioUsuarioComponent } from './formulario-usuario.component';

describe('FormularioUsuarioComponent', () => {
  let component: FormularioUsuarioComponent;
  let fixture: ComponentFixture<FormularioUsuarioComponent>;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FormularioUsuarioComponent],
      providers: [UsuarioService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultarPorDocumento').and.returnValue(
      of(new Usuario(1, 'usuario test', '123456'))
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia actualizar un usuario', waitForAsync(() => {
    component.actualizar = true;
    component.idDocumento = '123456';
    spyOn(usuarioService, 'actualizarUsuario').and.returnValue(
      of()
    );
    component.consultarUsuario().then(() => {
      expect(component.usuario.id).toEqual(1);
      expect(component.usuario.nombre).toEqual('usuario test');
      expect(component.usuario.idDocumento).toEqual('123456');
      expect(component.usuarioCreado).toBeFalse();
      return component.accionFormularioEnvio();
    }).then(() => {
      expect(component.usuarioCreado).toBeTrue();
    });
  }));

  it('deberia crear un usuario', waitForAsync(() => {
    spyOn(usuarioService, 'crearUsuario').and.returnValue(
      of(new Respuesta(1))
    );
    expect(component.usuarioCreado).toBeFalse();
    component.accionFormularioEnvio().then(() => {
      expect(component.usuarioCreado).toBeTrue();
      component.resetear();
      expect(component.usuarioCreado).toBeFalse();
    });
  }));

  it('deberia fallar al crear un usuario', waitForAsync(() => {
    spyOn(usuarioService, 'crearUsuario').and.returnValue(
      throwError({ error: { mensaje: 'errorTest' } })
    );
    expect(component.usuarioCreado).toBeFalse();
    component.accionFormularioEnvio().then(() => {
      expect(component.usuarioCreado).toBeFalse();
      expect(component.errorUsuarioFormulario.isError).toBeTrue();
      expect(component.errorUsuarioFormulario.descripcion).toEqual('errorTest');
    });
  }));
});
