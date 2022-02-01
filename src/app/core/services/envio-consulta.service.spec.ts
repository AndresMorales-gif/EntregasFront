import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Envio } from '../modelo/envio';
import { EnvioConsultaService } from './envio-consulta.service';

describe('EnvioConsultaService', () => {
    let httpMock: HttpTestingController;
    let service: EnvioConsultaService;
    const apiEndpointEnvios = `${environment.endpoint}/envios`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EnvioConsultaService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(EnvioConsultaService);
    });

    it('deberia consultar un envio', () => {
        const dummyEnvios = new Envio(1, '123456', '1234567', 1, true, 15, new Date(), 195, new Date());
        service.consultarEnvioPorId(1).subscribe(envio => {
            expect(envio).toEqual(dummyEnvios);
        });
        const req = httpMock.expectOne(`${apiEndpointEnvios}/1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyEnvios);
    });


});
