import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: Client[] = [];
  private idCounter = 1;

  constructor() { }

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }

  addClient(client: Client): Observable<Client> {
    client.id = this.idCounter++;
    this.clients.push(client);
    return of(client);
  }

  updateClient(client: Client): Observable<Client | null> {
    const index = this.clients.findIndex(c => c.id === client.id);
    if (index > -1) {
      this.clients[index] = client;
      return of(client);
    }
    return of(null);
  }

  deleteClient(id: number): Observable<boolean> {
    const index = this.clients.findIndex(c => c.id === id);
    if (index > -1) {
      this.clients.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}





