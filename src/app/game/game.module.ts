import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamePage } from './game.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GameModule } from './game-tabs/game-tabs.module';

import { GamePageRoutingModule } from './game-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GamePageRoutingModule,
    GameModule
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
