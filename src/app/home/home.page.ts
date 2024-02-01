import { Component } from '@angular/core';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  connectMetamask() {
    this.metamaskService.connectMetamask();
    this.walletAddress = this.metamaskService.walletAddress;
  }

  public walletAddress!: string;

  constructor(private metamaskService: MetamaskService) {}

  ngOnInit() {
    this.walletAddress = this.metamaskService.walletAddress;
  }
}
