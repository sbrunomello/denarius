import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-building-modal-content',
  templateUrl: './building-modal-content.component.html',
  styleUrls: ['./building-modal-content.component.scss'],
})
export class BuildingModalContentComponent {
  @Input() buildings!: any[]; // Array de construções disponíveis

  constructor(private modalController: ModalController) {}

  selectBuilding(building: any) {
    // Emitir o evento para selecionar a construção e fechar o modal
    this.modalController.dismiss(building);
  }
}
