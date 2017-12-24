// import { Observable } from 'rxjs/Observable';
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

  /*
    Using the async pipe instead of below:
      clients: Observable<Client[]>

      ngOnInit() {
        this.clients = this.clientservice.getClients();
          // the Observable will then be unwrapped in markup using async pipe

        Would not need subscription, and would not need to implement ngOnDestroy()
      }
  */
  
  subscription: Subscription;
  clients: any[] = [];
  totalOwed: number = 0;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.subscription = this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
      // return this.clients;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalOwed() {
    for(let client = 0; client < this.clients.length; client++ ) {
      this.totalOwed = this.totalOwed + parseFloat(this.clients[client].balance);     
    }
    return this.totalOwed;
  }

}
