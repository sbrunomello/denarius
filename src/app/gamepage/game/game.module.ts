import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameComponent } from './game.component';
import { BuildingModalModule } from './components/building-modal-content/building-modal-content.module';
import { BuildingInfoPopoverModule } from './components/building-info-popover/building-info-popover.module';
import { NavbarModule } from './components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildingModalModule,
    BuildingInfoPopoverModule,
    NavbarModule
  ],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModule {}
