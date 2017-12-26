import { Client } from './../models/Client';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientService {

  clientsRef: AngularFireList<any>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = this.db.list('/clients');
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => 
        ({ 
          key: c.payload.key, ...c.payload.val() 
        })
      );
    });
   }

   getClients() {
     return this.clients;
   }

   getClient(id: string) {
     this.client = this.db.object('/clients/'+id).valueChanges();
     return this.client;
   }

   addClient(value: Client) {
      this.clientsRef.push(value);
   }

}
