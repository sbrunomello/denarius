import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BuildingInfoPopoverComponent } from './building-info-popover.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [BuildingInfoPopoverComponent],
  exports: [BuildingInfoPopoverComponent]
})
export class BuildingInfoPopoverModule {}
