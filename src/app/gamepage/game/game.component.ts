import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Building } from './models/building.model';
import { BuildingModalContentComponent } from './building-modal-content/building-modal-content.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  grid!: any[][];
  houseCell: { row: number, col: number } | null = null; // Matriz para representar a grade do mapa
  buildable!: boolean[][]; // Matriz para representar se as células são construíveis
  highlightedCell: { row: number, col: number } | null = null; // Célula destacada ao passar o mouse sobre ela
  buildingOptionsVisible: boolean = false;
  selectedBuilding: string | null = null;
  showButtons: boolean = false;
  buildRow: any = 0;
  buildCol: any = 0;
  houseBuilt: boolean = false;
  buildings: Building[] = [
    new Building('Farm', 'assets/imgs/Farm.gif', 50),
    new Building('House', 'assets/imgs/House.gif', 100),
    new Building('House2', 'assets/imgs/House2.gif', 100),
    new Building('House3', 'assets/imgs/House3.gif', 100),
    new Building('Sawmill', 'assets/imgs/Sawmill.gif', 250),
    new Building('Quarry', 'assets/imgs/Quarry.gif', 300),
    new Building('Warehouse', 'assets/imgs/Warehouse.gif', 450),
    new Building('Blacksmith', 'assets/imgs/Blacksmith.gif', 600),
    new Building('Castle', 'assets/imgs/Castle.gif', 1000),
    new Building('Stable', 'assets/imgs/Stable.gif', 350)
    // Adicione mais construções conforme necessário
  ];


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.initializeGrid(); // Inicializar a grade do mapa
  }

  async openBuildingModal(row: number, col: number) {
    const modal = await this.modalController.create({
      component: BuildingModalContentComponent,
      componentProps: {
        buildings: this.buildings // Passar as construções disponíveis para o modal
      }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data) {
      // Lidar com a construção selecionada
      console.log('Construção selecionada:', data);
      this.selectedBuilding = data.name;
      this.placeBuilding(row, col);
    }
  }

  initializeGrid() {
    // Definir o tamanho da grade do mapa (por exemplo, 10x10)
    const rows = 6;
    const cols = 6;

    // Inicializar a grade do mapa com células vazias e definir a construtibilidade
    this.grid = [];
    this.buildable = [];
    for (let i = 0; i < rows; i++) {
      this.grid[i] = [];
      this.buildable[i] = [];
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = null;
        this.buildable[i][j] = this.isBuildableCell(i, j); // Lógica para determinar a construtibilidade
      }
    }
  }

  isBuildableCell(row: number, col: number): boolean {
    // Implemente a lógica para determinar se a célula é construível
    // Por exemplo, defina algumas células como construíveis e outras não
    return !this.grid[row][col];
  }

  highlightCell(row: number, col: number) {
    if (this.buildable[row][col]) {
      this.highlightedCell = { row, col };
    } else {
      this.highlightedCell = null;
    }
  }

  placeBuilding(row: number, col: number) {
    // Verifica se a célula clicada é construível
    if (this.selectedBuilding && this.buildable[row][col]) {
      // Atualiza a célula clicada para ficar vermelha
      this.buildRow = row;
      this.buildCol = col;
      this.showButtons = true;
      this.confirmBuilding();
      console.log(this.showButtons);
      //this.grid[row][col] = 'assets/imgs/' + this.selectedBuilding + '.gif';
      console.log(`Placed building [` + this.selectedBuilding + `] at row ${row}, col ${col}`);
      if (this.selectedBuilding === 'House') {
        this.houseCell = {row, col};
        this.houseBuilt = true; // Adiciona a flag para indicar que uma casa foi construída
      }
    }
  }

  onBuildingSelected(building: string) {
    this.selectedBuilding = building;
    this.showButtons = false;
    console.log(this.showButtons);
    console.log(building);
  }

  confirmBuilding() {
    console.log(`Construção confirmada na célula (${this.buildRow}, ${this.buildCol})`);
    // Implemente a lógica de confirmação da construção aqui
    this.grid[this.buildRow][this.buildCol] = 'assets/imgs/' + this.selectedBuilding + '.gif';
    console.log(this.showButtons);
    
    this.buildRow = null;
    this.buildCol = null;
    this.showButtons = false;
    console.log(this.showButtons);
  }
  
  cancelBuilding() {
    console.log('Construção cancelada');
    this.showButtons = false;
    console.log(this.showButtons);
    this.buildRow = null;
    this.buildCol = null;

  }
  
}

