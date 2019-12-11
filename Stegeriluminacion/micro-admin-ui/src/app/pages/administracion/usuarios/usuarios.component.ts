import { Component, OnDestroy, HostListener, EventEmitter, Output } from '@angular/core';
import { UsuariosPublicosDTO } from '../../../_dto/usuarios/UsuariosPublicos.Dto';
import { UsuariosPublicosFiltroDTO } from '../../../_dto/usuarios/UsuariosPublicosFiltroDTO';
import { UsuariosPublicosService } from '../../../_servicios/usuariospublicos.service';
import { UtilComponent } from '../../../_shared/util.component';
import { Router } from '@angular/router';
import { configuraciones } from '../../../../environments/configuraciones';
import { TableComponent } from '../../../_interfaces/tables.component';
import { PageableDTO } from '../../../_dto/_main/Pageable.Dto';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { BuscarUsuariosComponent } from './buscar/buscar.component';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.css']
})
export class UsuariosComponent extends TableComponent implements OnDestroy {

  public configuraciones: any;
  public utilComponent: any;
  public totalItems: number = 0;
  public currentPage: number = 0;
  public cantidadAMostrar: number = 5;
  bsModalRef: BsModalRef;

  public usuariosPublicosDTO: UsuariosPublicosDTO[];
  public usuariosPublicosFiltroDTO: UsuariosPublicosFiltroDTO;
  @Output() callbackOnModelWindowClose: EventEmitter<null> = new EventEmitter();

  constructor(private usuariosPublicosService: UsuariosPublicosService
    , private util: UtilComponent
    , private router: Router
    , private modalService: BsModalService) {
    super();
    this.configuraciones = configuraciones;
    this.utilComponent = util;

  }

  ngOnInit() {
    this.usuariosPublicosFiltroDTO = new UsuariosPublicosFiltroDTO();
    this.listAll(this.currentPage, this.cantidadAMostrar);
  }

  ngOnDestroy() {
  }

  /*
  ================================================================
                          OBTENER USUARIOS
  ================================================================
  */
  listAll(pagina: number, cantidad: number) {
    this.usuariosPublicosService.obtenerTodos(this.usuariosPublicosFiltroDTO, pagina, cantidad)
      .subscribe(resp => {
        this.util.loading = false;
        let pageable: PageableDTO = <PageableDTO>resp.cuerpo;
        this.usuariosPublicosDTO = pageable.content;
      }, (error: HttpErrorResponse) => {
        this.util.loading = false;
      });
  }
  pageChanged(event: any): void {
    this.listAll((event.page - 1), this.cantidadAMostrar);
  }
  rowsToShow(value) {
    this.cantidadAMostrar = value;
    this.listAll(this.currentPage, value);
  }

  /*
  ================================================================
                          EDITAR USUARIO
  ================================================================
  */
  editar(usuario: UsuariosPublicosDTO) {
    sessionStorage.setItem(configuraciones.static.usuario, JSON.stringify(usuario));
    this.router.navigate(["/usuarios/editar"]);
  }

  /*
  ================================================================
                          CREAR USUARIO
  ================================================================
  */
  nuevo() {
    this.router.navigate(["/usuarios/crear"]);
  }


  /*
  ================================================================
                          FILTRAR USUARIOS
  ================================================================
  */
  buscar() {
    const initialState = {
      usuariosPublicosFiltroDTO: this.usuariosPublicosFiltroDTO
    };

    this.bsModalRef = this.modalService.show(BuscarUsuariosComponent, { initialState });
    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.listAll(this.currentPage, this.cantidadAMostrar);
      }
    }); 
  }

  quitarFiltro() {
    this.util.cleanProperties(this.usuariosPublicosFiltroDTO);
    this.usuariosPublicosFiltroDTO.enabled = true;
  }


}
