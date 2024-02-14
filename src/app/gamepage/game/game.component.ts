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
  showBuildButtons: boolean = false;
  buildRow: any = 0;
  buildCol: any = 0;
  buildInfo!: any;
  build!: Building;
  buildingProgress!: number;
  cellConstruction: boolean = false;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.initializeGrid(); // Inicializar a grade do mapa
  }

  initializeGrid() {
    // Definir o tamanho da grade do mapa (por exemplo, 10x10)
    const rows = 16;
    const cols = 16;

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

  getBuildingHeight(cell: any): string {
    // Verifica se a célula contém um edifício
    if (cell && cell.size && cell.size.row) {
      // Calcula a altura do edifício com base no número de linhas ocupadas
      return `${cell.size.row * 10}vw`; // Supondo que cada célula tem 10vw de altura
    } else {
      return 'auto'; // Define a altura como automática se não houver edifício na célula
    }
  }

  getBuildingWidth(cell: any): string {
    // Verifica se a célula contém um edifício
    if (cell && cell.size && cell.size.col) {
      // Calcula a largura do edifício com base no número de colunas ocupadas
      return `${cell.size.col * 10}vw`; // Supondo que cada célula tem 10vw de largura
    } else {
      return 'auto'; // Define a largura como automática se não houver edifício na célula
    }
  }

  getGridColumnEnd(colIndex: number, cell: any): string {
    // Verifica se a célula contém um edifício
    if (cell && cell.size && cell.size.col) {
      // Calcula o final da coluna ocupada pelo edifício
      return `span ${cell.size.col + colIndex}`; // Calcula a quantidade de colunas ocupadas pelo edifício
    } else {
      return 'auto'; // Define o final da coluna como automático se não houver edifício na célula
    }
  }

  getGridRowEnd(rowIndex: number, cell: any): string {
    // Verifica se a célula contém um edifício
    if (cell && cell.size && cell.size.row) {
      // Calcula o final da linha ocupada pelo edifício
      return `span ${cell.size.row + rowIndex}`; // Calcula a quantidade de linhas ocupadas pelo edifício
    } else {
      return 'auto'; // Define o final da linha como automático se não houver edifício na célula
    }
  }





  async openBuildingOrInfo(row: number, col: number, cell: any) {
    let openModal: boolean = true;
    if (this.grid[row][col] && !this.cellConstruction) {
      // Já existe uma construção na célula, abrir o popover de informações
      const popover = await this.popoverController.create({
        component: BuildingInfoPopoverComponent,
        componentProps: {
          building: this.build,
        },
        event: event,
        translucent: true,
      });
      console.log(this.build);
      console.log("--LOG GRID BUILD --");
      console.log(this.grid);
      console.log("--LOG GRID BUILD --");
      let openModal: boolean = false;

      await popover.present();
    }
    if (!this.cellConstruction && !this.grid[row][col]) {
      // Não existe uma construção na célula, abrir o modal de construção
      const modal = await this.modalController.create({
        component: BuildingModalContentComponent,
        componentProps: {
          //buildings: buildings, // Passa a lista de edifícios disponíveis para o modal
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data) {
        // Lidar com a construção selecionada
        console.log("--LOG GRID BUILD --");
        console.log(this.grid);
        console.log("--LOG GRID BUILD --");


        console.log('Construção selecionada:', data);
        this.selectedBuilding = data.name;
        this.build = data;
        this.grid[row][col] = {
          showButtons: true
        };

        // Atualizar a célula destacada com o tamanho do edifício selecionado
        this.selectBuilding(this.build, row, col);
        this.cellConstruction = true;
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
    return !this.grid[row][col] || !this.grid[row][col].building;
  }

  highlightCell(row: number, col: number, size: { row: 4; col: 4 }) {
    if (this.buildable[row][col] && this.grid[row][col]) {
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
      const buildingSize = this.build.size;
      const endRow = row + buildingSize.row - 1;
      const endCol = col + buildingSize.col - 1;
      let buildable = true;

      // Verifica se todas as células necessárias para o edifício estão disponíveis
      if (endRow < this.grid.length && endCol < this.grid[row].length) {
        // Atualiza a grade com as células ocupadas pelo edifício
        let imgIndex: number = 1;
        let nameBuild: string;
        nameBuild = this.selectedBuilding.toLowerCase();
        for (let j = col; j <= endCol; j++) {
          for (let i = row; i <= endRow; i++) {
            if (this.isBuildableCell(i, j) && this.buildable[i][j]) {
              this.grid[i][j] = {
                building: this.selectedBuilding,
                src: 'assets/imgs/' + nameBuild + '/' + nameBuild + '_' + imgIndex + '.png',
                buildCompleted: true
              };
              this.buildable[i][j] = false;
              imgIndex++;
            }
          } 
        }
        // Define a célula de construção selecionada e limpa a célula destacada
        this.buildCell = { row, col };
        this.highlightedCell = null;
        // Oculta os botões de construção
        this.showBuildButtons = false;
        this.cellConstruction = false;
      }
    }
  }

  verifyBuildableCell() {

  }

  isSelectedCell(row: number, col: number): boolean {
    var k = this.buildCell !== null && row === this.buildCell.row && col === this.buildCell.col;
    if (k) {
      console.log(k);

    }

    return this.buildCell !== null && row === this.buildCell.row && col === this.buildCell.col;
  }

  // startConstruction1(row: number, col: number, cell: any) {
  //   this.build.progress = 0;
  //   this.grid[row][col] = {
  //     constructing: true,
  //     progress: 0
  //   };

  //   cell.progress = 0;

  //   console.log(`start construction in (${row}, ${col}, ${cell}`);

  //   const constructionInterval = setInterval(() => {
  //     if (cell.progress < 100) {
  //       this.build.progress += 10; // Aumenta o progresso em 10% a cada intervalo (simulado)
  //       cell.progress += 10;
  //     } else {
  //       cell.constructing = false;
  //       this.placeBuilding(row, col);
  //       console.log('construida');

  //       clearInterval(constructionInterval);
  //     }
  //   }, 1000); // Intervalo de 1 segundo (simulado)
  // }


  startConstruction(row: number, col: number, cell: any) {
    cell.constructing = true;
    cell.progress = 0;
    cell.showButtons = false;
    if (this.isBuildableCell(row, col)) {

    }
    const constructionInterval = setInterval(() => {
      if (cell.progress < 100) {
        cell.progress += 1; // Aumenta o progresso em 10% a cada intervalo (simulado)
      } else {
        cell.constructing = false;
        cell.completed = true;
        this.placeBuilding(row, col);
        clearInterval(constructionInterval);
      }
    }, 50); // Intervalo de 1 segundo (simulado)
  }

  cancelConstruction(row: number, col: number, cell: any) {
    cell.constructing = false;
    cell.showButtons = false;
    this.buildRow = null;
    this.buildCol = null;
    this.cellConstruction = false;

  }
}
