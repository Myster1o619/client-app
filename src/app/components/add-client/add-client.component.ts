import { ClientService } from './../../services/client.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName : '',
    lastName : '',
    email : '',
    phone: '',
    balance : 0,
    key : ''
  }

  disableBalanceOnAdd: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(value: Client, valid: boolean) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 4000});
      // this will not ever be shown: Submit button for form is currently disabled if the form itself is not valid.
    } else {
      this.clientService.addClient(value);
      this.router.navigate(['/']);
      this.flashMessagesService.show('New Client successfully added.', {cssClass: 'alert-success', timeout: 4000})
    }
  }

}
