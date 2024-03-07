import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crear-permiso',
  templateUrl: './crear-permiso.component.html',
  styleUrl: './crear-permiso.component.css'
})
export class CrearPermisoComponent {

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
  ) { }

  productoFormulario: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    clave: ['', Validators.required],
    accion: ['', Validators.required],
  })

  ngOnInit(): void {
    if (this.config.data) {
      this.productoFormulario.patchValue(this.config.data);
    }
  }

  hideDialog() {
    this.ref.close();
  }

  saveProduct() {
    const data = this.productoFormulario.value;    
    this.ref.close(data);
    if (data.estatus) {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Editado`, life: 3000 });
    }   
    setTimeout(() => {
      /* window.location.reload(); */
    }, 1000); 
  }

}
