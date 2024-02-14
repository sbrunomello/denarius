import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Building } from '../../models/building.model';
import { Citizen } from '../../models/citizen.model ';

@Component({
  selector: 'app-building-info-popover',
  templateUrl: './building-info-popover.component.html',
  styleUrls: ['./building-info-popover.component.scss'],
})
export class BuildingInfoPopoverComponent {
  @Input() building!: Building;

  constructor(private popoverController: PopoverController) { }

  citizen!: Citizen | null;

  dismiss() {
    console.log(this.building + "ALOOOOOOOOOOOOOOOOU");

    this.popoverController.dismiss();
  }

  upgradeBuilding(building: Building) {
    building.level++;
    building.workerLimit++;
  }

  addWorker(building: Building){

    console.log("--- log add worker --");
    if (building.workers.length < building.workerLimit) {
      this.citizen = new Citizen("Celso Russomano", 1,  building.name + " trabalhador");
      building.workers.push(this.citizen);
      this.citizen = null;
    } else {
      alert("Limite de "+ building.workerLimit +" trabalhadores atingido");
      console.log("Limite de "+ building.workerLimit +" trabalhadores atingido");
    }

    console.log(this.citizen);
    
    console.log(building);
    console.log("--- fim log ---");
    
    
  }
}
