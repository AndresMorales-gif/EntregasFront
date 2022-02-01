import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Envio } from '@core/modelo/envio';
import { Zona } from '../model/zona';

import { EnvioService } from './envio.service';

describe('ProductoService', () => {
    let httpMock: HttpTestingController;
    let service: EnvioService;
    const apiEndpointEnviosConsultaLista = `${environment.endpoint}/envios/usuario`;
    const apiEndpointEnvios = `${environment.endpoint}/envios`;
    const apiEndpointZonas = `${environment.endpoint}/zonas`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EnvioService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(EnvioService);
    });

    it('Deberia ser creado', () => {
        const envioService: EnvioService = TestBed.inject(EnvioService);
        expect(envioService).toBeTruthy();
    });

    it('deberia listar envios', () => {
        const dummyEnvios = [
            new Envio(1, '123456', '1234567', 1, true, 15, new Date(), 195, new Date()),
            new Envio(1, '123456', '1234567', 2, false, 15, new Date(), 195, new Date())
        ];
        service.consultarEnvios('123456', '1').subscribe(envios => {
            expect(envios.length).toEqual(2);
            expect(envios).toEqual(dummyEnvios);
        });
        const req = httpMock.expectOne(`${apiEndpointEnviosConsultaLista}/123456?consulta=1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyEnvios);
    });

    it('deberia listar zonas', () => {
        const dummyZonas = [
            new Zona(1, 'zona 1', 10),
            new Zona(1, 'zona 2', 15)
        ];
        service.consultarZonas().subscribe(zonas => {
            expect(zonas.length).toEqual(2);
            expect(zonas).toEqual(dummyZonas);
        });
        const req = httpMock.expectOne(apiEndpointZonas);
        expect(req.request.method).toBe('GET');
        req.flush(dummyZonas);
    });

    it('deberia crear un envio', () => {
        const dummyEnvios = new Envio(1, '123456', '1234567', 1, true, 15, new Date(), 195, new Date());
        service.crearEnvio(dummyEnvios).subscribe((respuesta) => {
            expect(respuesta).toEqual({ valor: 1 });
        });
        const req = httpMock.expectOne(apiEndpointEnvios);
        expect(req.request.method).toBe('POST');
        req.event(new HttpResponse<Respuesta>({ body: { valor: 1 } }));
    });

    it('deberia actialuzar un envio', () => {
        const dummyEnvios = new Envio(1, '123456', '1234567', 1, true, 15, new Date(), 195, new Date());
        service.actualizarEnvio(dummyEnvios).subscribe(() => {
            expect().nothing();
        });
        const req = httpMock.expectOne(`${apiEndpointEnvios}/1`);
        expect(req.request.method).toBe('PUT');
        req.event(new HttpResponse<void>());
    });

    it('deberia eliminar un envio', () => {
        service.eliminarEnvio(1).subscribe(() => {
            expect().nothing();
        });
        const req = httpMock.expectOne(`${apiEndpointEnvios}/1`);
        expect(req.request.method).toBe('DELETE');
        req.event(new HttpResponse<void>());
    });
});
