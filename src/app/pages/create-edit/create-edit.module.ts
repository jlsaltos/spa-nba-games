import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormGameComponent } from './form-game/form-game.component';
import { ROUTE_CREATE_EDIT } from './create-edit-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTE_CREATE_EDIT)
  ],
  exports: [],
  declarations: [FormGameComponent],
  providers: [],
})
export class CreateEditModule {}
