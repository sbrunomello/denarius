import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Building } from '../../models/building.model';

@Component({
  selector: 'app-building-modal-content',
  templateUrl: './building-modal-content.component.html',
  styleUrls: ['./building-modal-content.component.scss'],
})
export class BuildingModalContentComponent {
  buildings: Building[] = [
    new Building('Towncenter', 5, { row: 4, col: 4 }),
    new Building('House', 5, { row: 2, col: 2 }),
    new Building('Farm', 5, { row: 2, col: 2 }),
    new Building('Warehouse', 5, { row: 2, col: 2 }),
    new Building('Road', 5, { row: 1, col: 1 }),
  ];

  size!: { row: number; col: number };

  buildName: any;
  buildImage: any;
  buildCost: any;

  constructor(private modalController: ModalController) {}

  selectBuilding(building: Building) {
    this.modalController.dismiss(building);
    console.log(building);
  }

  returnImageBuild(buildName: string) {
    let srcImg = 'assets/imgs/' + buildName.toLowerCase() + '.png';
    return srcImg;
  }
}
