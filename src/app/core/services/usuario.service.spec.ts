import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelo/usuario';

import { UsuarioService } from './usuario.service';

describe('ProductoService', () => {
    let httpMock: HttpTestingController;
    let service: UsuarioService;
    const apiEndpointUsuarios = `${environment.endpoint}/usuarios`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsuarioService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(UsuarioService);
    });

    it('Deberia ser creado', () => {
        const envioService: UsuarioService = TestBed.inject(UsuarioService);
        expect(envioService).toBeTruthy();
    });

    it('deberia consultar un usuario', () => {
        const dummyUsuario = new Usuario(1, 'usuario test', '123456');
        service.consultarPorDocumento(new Usuario(null, null, '123456')).subscribe(usuario => {
            expect(usuario).toEqual(dummyUsuario);
        });
        const req = httpMock.expectOne(`${apiEndpointUsuarios}/123456`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyUsuario);
    });

    it('deberia crear un usuario', () => {
        const dummyUsuario = new Usuario(1, 'usuario test', '123456');
        service.crearUsuario(dummyUsuario).subscribe((respuesta) => {
            expect(respuesta).toEqual({ valor: 1 });
        });
        const req = httpMock.expectOne(apiEndpointUsuarios);
        expect(req.request.method).toBe('POST');
        req.event(new HttpResponse<Respuesta>({ body: { valor: 1 } }));
    });

    it('deberia actualizar un usuario', () => {
        const dummyUsuario = new Usuario(1, 'usuario test', '123456');
        service.actualizarUsuario(dummyUsuario).subscribe(() => {
            expect().nothing();
        });
        const req = httpMock.expectOne(`${apiEndpointUsuarios}/1`);
        expect(req.request.method).toBe('PUT');
        req.event(new HttpResponse<void>());
    });
});
