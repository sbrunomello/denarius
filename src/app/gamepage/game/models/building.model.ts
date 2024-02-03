// building.model.ts
export class Building {
    name: string;
    image: string;
    cost: number;
  
    constructor(name: string, image: string, cost: number) {
      this.name = name;
      this.image = image;
      this.cost = cost;
    }
  }
  