import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkEnvio = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkRastrear = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonEnvios() {
        await this.linkEnvio.click();
    }

    async clickBotonRastrear() {
        await this.linkRastrear.click();
    }

}
