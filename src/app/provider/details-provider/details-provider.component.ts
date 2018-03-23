import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'


@Component({
  selector: 'app-provider-details',
  templateUrl: './details-provider.component.html',
  styleUrls: ['./details-provider.component.css']
})
export class DetailsProviderComponent implements OnInit {

  provider: any

  constructor(private broadcastObjService: BroadcastObjectService) { }

  ngOnInit() {
    this.broadcastObjService.currentProvider.subscribe(provider => {
      this.provider = provider
    })
  }

}