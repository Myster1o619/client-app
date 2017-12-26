import { ClientService } from './../../services/client.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {

  client: Client = {
    firstName : '',
    lastName : '',
    email : '',
    phone: '',
    balance : 0,
    key : ''
  }

  id: string;

  subscription: Subscription;
  routeSubscription: Subscription;

  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.subscription = this.clientService.getClient(this.id).subscribe(client => { 
      this.client = client;
    });   
  }

  onSubmit(value: Client, valid: boolean) {

    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 4000});
      // this will not ever be shown: Submit button for form is currently disabled if the form itself is not valid.
    } else {
      this.clientService.updateClient(this.id, value);
      this.router.navigate(['/client/'+this.id]);
      this.flashMessagesService.show('Client successfully edited.', {cssClass: 'alert-success', timeout: 4000})
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
