import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameTabsComponent } from './game-tabs.component';

@NgModule({
    imports: [ CommonModule, FormsModule, IonicModule],
    declarations: [GameTabsComponent],
    exports: [GameTabsComponent]
  })
export class GameModule {}