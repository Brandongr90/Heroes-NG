import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../../provider/servicio.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product';
import { TableLazyLoadEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegistroComponent } from '../registro/registro.component';
import { CrearPermisoComponent } from '../dialogs/crear-permiso/crear-permiso.component';
import { PermisosService } from 'src/app/provider/permisos.service';

@Component({
  selector: 'app-crudpermisos',
  templateUrl: './crudpermisos.component.html',
  styleUrl: './crudpermisos.component.css',
})
export class CrudpermisosComponent {
  constructor(
    public router: Router,
    public dataService: ServicioService,
    private dataPService: PermisosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  productDialogVisible: boolean = false;

  productsList: Product[] = [];

  selectedProduct: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  ees!: any[];

  loading = false;

  total = 10;

  categories = ['DC Comics', 'Marvel', 'TMNT'];

  dialogRef: DynamicDialogRef | undefined;

  ngOnInit() {
    this.ees = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  openProductDialog() {
    this.selectedProduct = {};
    this.submitted = false;
    this.productDialogVisible = true;
  }

  /* Traer Permisos */
  readPermisos(event: TableLazyLoadEvent) {
    this.dataPService.POST('permisos/getAll', event).subscribe((data: any) => {
      if (data.data.length > 0) {
        console.log(data.data);

        this.productsList = data.data;
        this.total = data.count;
      }
    });
  }

  /* Abrir "Insertar Permiso" */
  openDialog() {
    this.dialogRef = this.dialogService.open(CrearPermisoComponent, {
      header: 'Añadir Permiso',
      data: this.selectedProduct,
    });
    this.dialogRef.onClose.subscribe((data: any) => {
      this.selectedProduct = data;
      console.log(this.selectedProduct);

      this.insertarPermiso();
    });
  }

  /* Insertar Permiso */
  insertarPermiso() {
    if (this.selectedProduct.nombre?.trim()) {
      if (this.selectedProduct.id) {
        this.dataPService
          .PUT(
            'permisos/update/' + this.selectedProduct.id,
            this.selectedProduct
          )
          .subscribe((data: any) => {
            this.selectedProduct = {};
          });
      } else {
        this.selectedProduct.id = this.generateId();
        this.dataPService
          .POST('permisos/insert', this.selectedProduct)
          .subscribe((data: any) => {
            if (data.estatus) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: `${this.selectedProduct.nombre} creado`,
                life: 3000,
              });
              this.selectedProduct = {};
            }
          });
      }
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  /* Eliminar Permiso */
  deletePermiso(product: Product) {
    this.confirmationService.confirm({
      message: `Estas seguro que quieres eliminar ${product.nombre}`,
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataPService
          .DELETE('permisos/delete/', product.id)
          .subscribe((data: any) => {
            if (data.estatus) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: `${product.nombre} eliminado`,
                life: 8000,
              });
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Error',
                detail: `Fallo al eliminar ${product.nombre}`,
                life: 8000,
              });
            }
          });
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        this.messageService.add({
          severity: 'success',
          summary: 'Exito!',
          detail: `Eliminado Correctamente`,
          life: 8000,
        });
      },
    });
  }

  deleteSelectedProducts() {
    let message = {};
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar a los heroes seleccionados?',
      header: 'Eliminar Varios',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProducts?.forEach((product) => {
          this.dataService.DELETE('', product.id).subscribe((data: any) => {
            if (data.estatus) {
              message = {
                severity: 'success',
                summary: 'Successful',
                detail: `${product.nombre} deleted`,
                life: 3000,
              };
            } else {
              message = {
                severity: 'warn',
                summary: 'Warning',
                detail: `${product.nombre} not deleted`,
                life: 3000,
              };
            }
            this.messageService.add(message);

            this.selectedProduct = {};
          });
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        this.messageService.add({
          severity: 'success',
          summary: 'Exito!',
          detail: `Eliminados Correctamente`,
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.openDialog();
  }

  generateId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  filterData(event: any) {
    return event.target.value;
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
      case 'Update':
        return 'primary';
    }
  }
}
