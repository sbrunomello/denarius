import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  food: string = '350'; // Exemplo de quantidade de recursos
  wood: string = '400';
  stone: string = '250';
  denarius: string = '3600,00'; // Exemplo de quantidade de moedas
  workers: string = '5/10'; // Exemplo de quantidade de trabalhadores

  constructor() { }

  ngOnInit(): void {
    // Implemente lógica adicional, se necessário
  }
}
