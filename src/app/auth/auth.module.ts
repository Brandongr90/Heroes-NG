import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { CrudpermisosComponent } from './pages/crudpermisos/crudpermisos.component';
import { CrearPermisoComponent } from './pages/dialogs/crear-permiso/crear-permiso.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    PermisosComponent,
    CrudpermisosComponent,
    CrearPermisoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    TableModule,
    ButtonModule,
    TagModule,
    RatingModule,
    ToastModule,
    PickListModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    DragDropModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService, 
    MessageService, 
    DialogService]
})
export class AuthModule { }
