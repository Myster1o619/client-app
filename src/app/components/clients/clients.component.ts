import { Observable } from 'rxjs/Observable';
import { Client } from './../../models/Client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  clients: Client[];
   
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.subscription = this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      return this.clients;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
