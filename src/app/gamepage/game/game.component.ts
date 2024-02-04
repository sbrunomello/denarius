import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { BuildingInfoPopoverComponent } from './components/building-info-popover/building-info-popover.component';
import { BuildingModalContentComponent } from './components/building-modal-content/building-modal-content.component';
import { Building } from './models/building.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  grid!: any[][];
  constructionGrid!: any[][];
  buildCell: { row: number; col: number } | null = null; // Matriz para representar a grade do mapa
  buildable!: boolean[][]; // Matriz para representar se as células são construíveis
  highlightedCell: {
    row: number;
    col: number;
    size: { row: number; col: number };
  } | null = null; // Célula destacada ao passar o mouse sobre ela
  buildingOptionsVisible: boolean = false;
  selectedBuilding: string | null = null;
  showButtons: boolean = false;
  buildRow: any = 0;
  buildCol: any = 0;
  buildInfo!: any;
  build!: Building;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.initializeGrid(); // Inicializar a grade do mapa
  }

  initializeGrid() {
    // Definir o tamanho da grade do mapa (por exemplo, 10x10)
    const rows = 6;
    const cols = 6;

    // Inicializar a grade do mapa com células vazias e definir a construtibilidade
    this.grid = [];
    this.buildable = [];
    // Inicializar a grade principal do mapa
    this.initializeMainGrid(rows, cols);

    // Inicializar a grade de construções
    this.initializeConstructionGrid(rows, cols);
  }

  initializeMainGrid(rows: number, cols: number) {
    this.grid = [];
    this.buildable = [];
    for (let i = 0; i < rows; i++) {
      this.grid[i] = [];
      this.buildable[i] = [];
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = null;
        this.buildable[i][j] = this.isBuildableCell(i, j);
      }
    }
  }

  initializeConstructionGrid(rows: number, cols: number) {
    this.constructionGrid = [];
    for (let i = 0; i < rows; i++) {
      this.constructionGrid[i] = [];
      for (let j = 0; j < cols; j++) {
        this.constructionGrid[i][j] = null;
      }
    }
  }

  async openBuildingOrInfo(row: number, col: number, cell: any) {
    if (this.grid[row][col]) {
      // Já existe uma construção na célula, abrir o popover de informações
      const popover = await this.popoverController.create({
        component: BuildingInfoPopoverComponent,
        componentProps: {
          building: cell,
        },
        event: event,
        translucent: true,
      });
      console.log(cell);

      await popover.present();
    } else {
      // Não existe uma construção na célula, abrir o modal de construção
      const modal = await this.modalController.create({
        component: BuildingModalContentComponent,
        componentProps: {
          // Passar as construções disponíveis para o modal, se necessário
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data) {
        // Lidar com a construção selecionada
        console.log('Construção selecionada:', data);
        this.selectedBuilding = data.name;
        this.build = data;

        console.log(this.buildInfo);

        // Verificar o tamanho da construção
        this.selectBuilding(this.build, row, col);

        this.placeBuilding(row, col);
      }
    }
  }

  selectBuilding(building: Building, row: number, col: number) {
    if (building.size && building.size.row === 4 && building.size.col === 4) {
      // Definir as coordenadas onde a construção será colocada
      this.highlightedCell = { row: row, col: col, size: { row: 4, col: 4 } };
    }
  }

  isBuildableCell(row: number, col: number): boolean {
    // Implemente a lógica para determinar se a célula é construível
    // Por exemplo, defina algumas células como construíveis e outras não
    return !this.grid[row][col];
  }

  highlightCell(row: number, col: number, size: { row: 4; col: 4 }) {
    if (this.buildable[row][col]) {
      this.highlightedCell = { row, col, size };
    } else {
      this.highlightedCell = null;
    }
  }

  isHighlighted(row: number, col: number): boolean {
    if (!this.highlightedCell) return false;
    const { row: r, col: c, size } = this.highlightedCell;
    return row >= r && row < r + size.row && col >= c && col < c + size.col;
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
      console.log(
        `Placed building [` +
          this.selectedBuilding +
          `] at row ${row}, col ${col}`
      );

      this.buildCell = { row, col };

      this.buildable[row][col] = false;
      this.highlightedCell = null;
    }
  }

  onBuildingSelected(building: string) {
    this.selectedBuilding = building;
    this.showButtons = false;
    console.log(this.showButtons);
    console.log(building);
  }

  confirmBuilding() {
    console.log(
      `Construção confirmada na célula (${this.buildRow}, ${this.buildCol})`
    );
    // Implemente a lógica de confirmação da construção aqui
    //this.grid[this.buildRow][this.buildCol] = 'assets/imgs/' + this.selectedBuilding + '.gif';
    this.grid[this.buildRow][this.buildCol] = {
      building: this.selectedBuilding,
      src: 'assets/imgs/' + this.selectedBuilding + '.gif',
    };
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
