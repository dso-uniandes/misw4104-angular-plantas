import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantListComponent } from './plant-list/plant-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [PlantListComponent],
  declarations: [PlantListComponent]
})
export class PlantModule { }
