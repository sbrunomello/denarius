import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Building } from '../../models/building.model';

@Component({
  selector: 'app-building-info-popover',
  template: `
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <img [src]="image" alt="{{ name }}">
          </ion-avatar>
          <ion-label>
            <h2>{{ name }}</h2>
            <p>_______________ </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styleUrls: ['./building-info-popover.component.scss'],
})
export class BuildingInfoPopoverComponent {
  @Input() building!: Building;

  image: any;
  name: any;

  constructor(private popoverController: PopoverController) { }

  dismiss() {
    console.log(this.building);
    this.image = this.building.image;
    this.name = this.building.name;
    
    this.popoverController.dismiss();
  }
}
