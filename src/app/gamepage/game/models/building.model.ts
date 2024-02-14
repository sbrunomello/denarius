import { Citizen } from "./citizen.model ";

export class Building {
  name: string;
  cost: number;
  size: { row: number, col: number }; // Defina size como um objeto com rows e cols
  progress: number; // Progresso da construção (em porcentagem)
  constructing: boolean; // Indica se a construção está em andamento
  level: number;
  workerLimit: number;
  workers: Citizen[];


  constructor(name: string, cost: number, size: { row: number, col: number }) {
    this.name = name;
    this.cost = cost;
    this.size = size;
    this.progress = 0;
    this.constructing = false;
    this.level = 1;
    this.workerLimit = 1;
    this.workers = [];
  }
}
