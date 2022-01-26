import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-envio',
    templateUrl: './envio.component.html',
    styleUrls: ['./envio.component.css']
})

export class EnvioComponent implements OnInit {
    
    constructor(private navegacion: Router) { }

    ngOnInit(): void {
        
    }

    redireccionar(ruta: string) {
        console.log("aca")
        this.navegacion.navigateByUrl(ruta);
    }
}