import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/Client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  subscription: Subscription;
  routeSubscription: Subscription;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private flashMessagesService: FlashMessagesService,
    
    
  ) { }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.subscription = this.clientService.getClient(this.id).subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      } 
      this.client = client;
    });   
  }

  onDeleteClick() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
