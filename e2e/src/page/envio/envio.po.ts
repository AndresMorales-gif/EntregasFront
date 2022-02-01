import { by, element } from 'protractor';

export class EnvioPage {
    private linkListarEnvio = element(by.buttonText('Listar mis envios'));
    private linkCrearEnvio = element(by.buttonText('Crear envio'));
    private linkListarEnvioPendiente = element(by.buttonText('Envios pendientes'));
    private linkListarEnvioEnProceso = element(by.buttonText('Evios en proceso'));
    private linkListarEnvioHistorico = element(by.buttonText('Historico de envios'));
    private submitConsultarUsuario = element(by.buttonText('Consultar'));
    private submitConsultarRemitente = element(by.buttonText('Consultar remitente'));
    private submitConsultarDestinatario = element(by.buttonText('Consultar destinatario'));
    private listaEnviosVacia = element(by.className('contenedor-lista-envios-vacia'));
    private inputIdDocumento = element(by.id('idDocumentoUsuario'));
    private inputIdDocumentoRemitente = element(by.id('idDocumentoRemitente'));
    private inputIdDocumentoDestinatario = element(by.id('idDocumentoDestinatario'));
    private optionsZonas = element.all(by.tagName('option'));
    private inputPesoCarga = element(by.id('pesoCarga'));
    private inputEnvioPlus = element(by.id('envioPlus'));
    private submitCrearEnvio = element(by.buttonText('Crear'));
    private envioCreado = element(by.className('contenedor-envio-creado-exito'));
    private listaEnvios = element.all(by.className('contenedor-card-envio'));

    async clickBotonListarEnvios() {
        await this.linkListarEnvio.click();
    }

    async clickBotonCrearEnvio() {
        await this.linkCrearEnvio.click();
    }

    async clickBotonListarEnviosPendientes() {
        await this.linkListarEnvioPendiente.click();
    }

    async clickBotonListarEnviosEnProceso() {
        await this.linkListarEnvioEnProceso.click();
    }

    async clickBotonListarEnviosHistoricos() {
        await this.linkListarEnvioHistorico.click();
    }

    async clickBotonConsultarUsuario() {
        await this.submitConsultarUsuario.click();
    }

    async clickBotonConsultarRemitente() {
        await this.submitConsultarRemitente.click();
    }

    async clickBotonConsultarDestinatario() {
        await this.submitConsultarDestinatario.click();
    }

    async ingresarIdDocumento(idDocumento) {
        await this.inputIdDocumento.sendKeys(idDocumento);
    }

    async ingresarIdDocumentoRemitente(idDocumento) {
        await this.inputIdDocumentoRemitente.sendKeys(idDocumento);
    }

    async ingresarIdDocumentoDestinatario(idDocumento) {
        await this.inputIdDocumentoDestinatario.sendKeys(idDocumento);
    }

    async selectOptionZona(idZona) {
        console.log(this.optionsZonas);
        await this.optionsZonas.get(idZona).click();
    }

    async ingresarPesoCarga(pesoCarga) {
        await this.inputPesoCarga.sendKeys(pesoCarga);
    }

    async clickEnvioPlus() {
        await this.inputEnvioPlus.click();
    }

    async clickBotonCrearEnvioFormulario() {
        await this.submitCrearEnvio.click();
    }

    async contarEnvios() {
        return this.listaEnvios.count();
    }

    async seVeListaVacia() {
        return this.listaEnviosVacia.isDisplayed();
    }

    async seVeEnvioCreado() {
        return this.envioCreado.isDisplayed();
    }
}
