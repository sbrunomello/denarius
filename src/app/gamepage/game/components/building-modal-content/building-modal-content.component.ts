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
    new Building('Farm', 'assets/imgs/Farm.gif', 5, { row: 4, col: 4 }),
    new Building('House', 'assets/imgs/House.gif', 100, { row: 4, col: 4 }),
    new Building('House2', 'assets/imgs/House2.gif', 100, { row: 4, col: 4 }),
    new Building('House3', 'assets/imgs/House3.gif', 100, { row: 4, col: 4 }),
    new Building('Sawmill', 'assets/imgs/Sawmill.gif', 250, { row: 4, col: 4 }),
    new Building('Quarry', 'assets/imgs/Quarry.gif', 300, { row: 4, col: 4 }),
    new Building('Warehouse', 'assets/imgs/Warehouse.gif', 450, { row: 4, col: 4 }),
    new Building('Blacksmith', 'assets/imgs/Blacksmith.gif', 600, { row: 4, col: 4 }),
    new Building('Castle', 'assets/imgs/Castle.gif', 1000, { row: 4, col: 4 }),
    new Building('Stable', 'assets/imgs/Stable.gif', 350, { row: 4, col: 4 })
  ];

  size!: { row: number, col: number };

  buildName: any;
  buildImage: any;
  buildCost: any;

  constructor(private modalController: ModalController) {}

  selectBuilding(building: Building) {
    this.modalController.dismiss(building);
    console.log(building);
    
  }
}
