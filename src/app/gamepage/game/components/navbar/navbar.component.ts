import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  food: number = 350; // Exemplo de quantidade de recursos
  wood: number = 400;
  stone: number = 250;
  denarius: string = '3600,00'; // Exemplo de quantidade de moedas
  workers: number = 5; // Exemplo de quantidade de trabalhadores

  constructor() { }

  ngOnInit(): void {
    // Implemente lógica adicional, se necessário
  }
}
