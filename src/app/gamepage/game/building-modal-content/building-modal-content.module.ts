import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BuildingModalContentComponent } from './building-modal-content.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [BuildingModalContentComponent],
  exports: [BuildingModalContentComponent]
})
export class BuildingModalModule {}
