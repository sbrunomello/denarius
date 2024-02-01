import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss'],
})
export class GameTabsComponent {

  constructor(private router: Router) {}

  changeTab(tab: string) {
    this.router.navigateByUrl(tab);
  }
}
