import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showBuildMenu: boolean = false;
  showInventoryMenu: boolean = false;
  buildingOptions: string[] = ['Farm', 'House', 'House2', 'House3',  'Sawmill', 'Quarry', 'Warehouse', 'Blacksmith', 'Castle', 'Stable'];

  @Output() buildingSelected = new EventEmitter<string>();

  toggleBuildMenu() {
    this.showBuildMenu = !this.showBuildMenu;
    this.showInventoryMenu = false;
  }

  toggleInventoryMenu() {
    this.showInventoryMenu = !this.showInventoryMenu;
    this.showBuildMenu = false;
  }

  selectBuilding(building: string) {
    console.log('Building selected:', building);
    this.buildingSelected.emit(building);
    // Implemente a lógica para selecionar o edifício
  }
}
