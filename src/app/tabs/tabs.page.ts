import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) { }
  
  goHome() {
    this.router.navigate(['/app/home']);
    console.log("aaaa");
    
  } 
  goGame() {
    this.router.navigate(['/app/game']);
    console.log("aaaa");
    
  } 
  goInfo() {
    this.router.navigate(['/app/info']);
    console.log("aaaa");
    
  }  

}
