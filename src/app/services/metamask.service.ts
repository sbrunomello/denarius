import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private accounts: string | any[] = [];
  public walletAddress!: string;

  constructor() { }

  async connectMetamask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        console.log("Connected to Metamask!");
        this.getWalletAddress();
      } catch (error) {
        console.error("User denied account access or something went wrong.");
      }
    } else {
      console.error("Metamask not detected. Please install Metamask extension.");
    }
  }

  async getWalletAddress() {
    this.accounts = await window.web3.eth.getAccounts();
    if (this.accounts.length > 0) {
      this.walletAddress = this.accounts[0];
      console.log(this.accounts);
      
    } else {
      console.error("No accounts found.");
    }
  }
}
