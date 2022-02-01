import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { EnvioPage } from '../page/envio/envio.po';

describe('workspace-project Envio', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let envio: EnvioPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        envio = new EnvioPage();
    });

    it('Deberia listar vacio', () => {
        page.navigateTo();
        navBar.clickBotonEnvios();
        envio.clickBotonListarEnvios();
        envio.ingresarIdDocumento('123456');
        envio.clickBotonConsultarUsuario();
        envio.clickBotonListarEnviosHistoricos();
        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
        expect(envio.seVeListaVacia()).toBeTruthy();
    });

    it('Deberia crear envio', () => {
        page.navigateTo();
        navBar.clickBotonEnvios();
        envio.clickBotonCrearEnvio();
        envio.ingresarIdDocumentoRemitente('123456');
        envio.clickBotonConsultarRemitente();
        envio.ingresarIdDocumentoDestinatario('123457');
        envio.clickBotonConsultarDestinatario();
        envio.selectOptionZona(2);
        envio.ingresarPesoCarga(15);
        envio.clickBotonCrearEnvioFormulario();
        expect(envio.seVeEnvioCreado()).toBeTruthy();
    });

    it('Deberia crear envio con envioPlus', () => {
        page.navigateTo();
        navBar.clickBotonEnvios();
        envio.clickBotonCrearEnvio();
        envio.ingresarIdDocumentoRemitente('123456');
        envio.clickBotonConsultarRemitente();
        envio.ingresarIdDocumentoDestinatario('123457');
        envio.clickBotonConsultarDestinatario();
        envio.selectOptionZona(4);
        envio.ingresarPesoCarga(15);
        envio.clickEnvioPlus();
        envio.clickBotonCrearEnvioFormulario();
        expect(envio.seVeEnvioCreado()).toBeTruthy();
    });

    it('Deberia listar pendiente', () => {
        page.navigateTo();
        navBar.clickBotonEnvios();
        envio.clickBotonListarEnvios();
        envio.ingresarIdDocumento('123456');
        envio.clickBotonConsultarUsuario();
        envio.clickBotonListarEnviosPendientes();
        expect(envio.contarEnvios()).not.toEqual(0);
    });

    it('Deberia listar en proceso', () => {
        page.navigateTo();
        navBar.clickBotonEnvios();
        envio.clickBotonListarEnvios();
        envio.ingresarIdDocumento('123456');
        envio.clickBotonConsultarUsuario();
        envio.clickBotonListarEnviosEnProceso();
        expect(envio.contarEnvios()).not.toEqual(0);
    });
});
