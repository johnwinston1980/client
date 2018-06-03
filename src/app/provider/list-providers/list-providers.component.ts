import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProviderService } from '../shared/provider.service'
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import {RatingModule} from "ngx-rating";

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.css'],
  providers: [ProviderService]
})
export class ListProvidersComponent implements OnInit, OnDestroy {

  providers: any;
  //subsription: Subscription

  constructor(private providerService: ProviderService,
    private router: Router,
    private broadcastObjectService: BroadcastObjectService
  ) { }

  ngOnInit() {
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
    })
  }

  ngOnDestroy() {

  }

  openProvider(provider) {
    this.broadcastObjectService.broadcastProvider(provider)
    //this.router.navigate(['/list-categories', provider.id])
    this.router.navigate(['/content', provider.id])
  }
}