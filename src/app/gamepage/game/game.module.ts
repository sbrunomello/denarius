import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameComponent } from './game.component';
import { NavbarModule } from '../navbar/navbar.module';
import { BuildingModalModule } from './building-modal-content/building-modal-content.module';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, NavbarModule, BuildingModalModule],
  declarations: [GameComponent],
  exports: [GameComponent]
})
export class GameModule {}
