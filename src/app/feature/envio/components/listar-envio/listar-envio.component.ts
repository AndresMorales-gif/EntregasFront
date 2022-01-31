import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Error } from '@core/modelo/error';
import { Envio } from '@envio/shared/model/envio';
import { EnvioService } from '@envio/shared/service/envio.service';
import { Usuario } from '@core/modelo/usuario';
import { UsuarioService } from '@core/services/usuario.service';

const PENDIENTES = '1';

@Component({
  selector: 'app-listar-envio',
  templateUrl: './listar-envio.component.html',
  styleUrls: ['./listar-envio.component.css']
})
export class ListarEnvioComponent implements OnInit {
  remitente: Usuario;
  errorListarEnvios: Error;
  consultaEnvios: boolean;
  envios: Envio[];
  modalEliminar = false;
  esEditable = false;
  idAccion: number;

  constructor(protected envioService: EnvioService, protected usuarioService: UsuarioService, private navegacion: Router) {
    this.errorListarEnvios = new Error();
  }

  consultarUsuarioTerminado(usuario: Usuario) {
    this.remitente = usuario;
  }

  consultarEnvios(tipoConsulta: string): Promise<void> {
    this.esEditable = false;
    if (tipoConsulta === PENDIENTES) {
      this.esEditable = true;
    }
    return this.envioService.consultarEnvios(this.remitente.idDocumento, tipoConsulta).toPromise()
      .then((envios) => {
        this.envios = envios;
        this.consultaEnvios = true;
      });
  }

  accionEliminarModal(id: number): void {
    this.idAccion = id;
    this.cerrarAbrirModal();
  }

  accionModificar(id: number): void {
    this.navegacion.navigateByUrl(`envio/editar/${id}`);
  }

  accionEliminar(): Promise<void> {
    return this.envioService.eliminarEnvio(this.idAccion).toPromise().then(() => {
      this.idAccion = null;
      this.cerrarAbrirModal();
      this.consultarEnvios(PENDIENTES);
    });
  }

  cerrarAbrirModal(): void {
    this.modalEliminar = !this.modalEliminar;
  }

  ngOnInit(): void {
    this.resetear();
  }

  resetear(): void {
    this.envios = [];
    this.consultaEnvios = false;
    this.remitente = null;
  }

}
