import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { MaterialModule } from '@/material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ModalModule.forRoot()
  ],
  exports: [
    ErrorModalComponent
  ],
  declarations: 
  [
    ErrorModalComponent
  ]
})
export class ModalsModule { }