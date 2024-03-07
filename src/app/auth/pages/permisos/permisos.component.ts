import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/interfaces/product';
import { ServicioService } from 'src/app/provider/servicio.service';
import { RegistroComponent } from '../registro/registro.component';
import { CrudpermisosComponent } from '../crudpermisos/crudpermisos.component';
import { PermisosService } from 'src/app/provider/permisos.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css',
})
export class PermisosComponent {
  targetProducts!: any[];

  usuarios: any;

  permisosDisponibles: any;

  permisosAsignados: any;

  usuarioSeleccionado: any;

  productsList: Product[] = [];

  dialogRef: DynamicDialogRef | undefined;

  dataPrueba: any = {
    id_user: '1',
    id_permiso: '15',
    estatus: '1',
  };

  constructor(
    private cdr: ChangeDetectorRef,
    public dataService: ServicioService,
    private dialogService: DialogService,
    private dataPService: PermisosService,
    private messageService: MessageService
  ) {
    this.ObtenerUsuarios();
  }

  ngOnInit() {
    this.targetProducts = [];
  }

  ObtenerUsuarios() {
    this.dataPService.GET('getUsuarios').subscribe((data: any) => {
      if (data.length > 0) {
        this.usuarios = data;
      }
    });
  }

  showAsignados() {
    this.dataPService
      .GETDATA('showAsignados/', this.usuarioSeleccionado.id)
      .subscribe((data: any) => {
          this.permisosAsignados = data;
        
      });
  }
  
  showDisponibles() {
    this.dataPService
      .GETDATA('showDisponibles/', this.usuarioSeleccionado.id)
      .subscribe((data: any) => {
          this.permisosDisponibles = data;
        
      });
  }

  /* actualizarPermisos() {
    this.permisosAsignados.forEach((permisos : any ) => {
    });
      this.dataPService
      .POST('updateInsert', this.permisosAsignados)
      .subscribe((data: any) => {
        if (data.estatus) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: `Actualizado`,
            life: 3000,
          });
        }
      });
  } */

  quitarPermisos(event: any) {
    event.items.forEach((item: any) => {
      this.dataPService.DELETE('DeletePermisos', {id_user: this.usuarioSeleccionado.id, id_permiso: item.id, estatus: 0}).subscribe((data: any) => {
        
      })
    });
  }
  
  actualizarPermisos(event: any) {
    event.items.forEach((item: any) => {
      this.dataPService.POST('ActualizarPermisos', {id_user: this.usuarioSeleccionado.id, id_permiso: item.id, estatus: 1}).subscribe((data: any) => {
        
      })
    });
  }

  actualizarPermisos1() {
    const observables = this.permisosAsignados.map((data: any) => {
      return this.dataPService.POST('updateInsert', data);
    });

    forkJoin<any[]>(observables).subscribe((responses: any[]) => {
      // Verifica si todas las respuestas tienen el estatus correcto
      const allSuccessful = responses.every(
        (response: { estatus: boolean }) => response.estatus
      );

      if (allSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Actualizado',
          life: 3000,
        });
      } else {
        // Maneja el caso en que al menos una de las solicitudes no tenga éxito
      }
    });
  }

  traerALV() {
    this.showDisponibles();
    this.showAsignados();
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(CrudpermisosComponent, {
      header: 'Permisos',
      /* data: this.selectedProduct */
    });
    this.dialogRef.onClose.subscribe((data: any) => {
      /* this.selectedProduct = data;
      this.saveProduct(); */
    });
  }

  mostrarSeleccionados() {
    console.log(this.permisosAsignados);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Create':
        return 'success';
      case 'Admin':
        return 'warning';
      case 'Delete':
        return 'danger';
      case 'Access':
        return 'info';
    }
  }
}
