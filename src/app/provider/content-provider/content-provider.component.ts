import { Component, OnInit} from '@angular/core';

import { MenuComponent } from '../../menu/menu/menu.component'

@Component({
  selector: 'app-content-provider',
  templateUrl: './content-provider.component.html',
  styleUrls: ['./content-provider.component.css']
})
export class ContentProviderComponent implements OnInit {

  selectedTabIndex: number

  constructor() { 
    
  }

  ngOnInit() {    
    this.selectedTabIndex = parseInt(localStorage.getItem('index'))       
    console.log(this.selectedTabIndex)
  } 

  tabChange(event) {
    localStorage.setItem('index', event.index)
    this.selectedTabIndex = event.index
    /*console.log(event.index)
    Promise.resolve().then(() => this.selectedTabIndex = event.index);*/
  }

}
