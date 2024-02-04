export class Building {
  name: string;
  image: string;
  cost: number;
  size: { row: number, col: number }; // Defina size como um objeto com rows e cols

  constructor(name: string, image: string, cost: number, size: { row: number, col: number }) {
    this.name = name;
    this.image = image;
    this.cost = cost;
    this.size = size;
  }
}
