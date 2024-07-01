import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {
  clientForm: FormGroup;
  clients: Client[] = [];
  editingClient: Client | null = null;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => this.clients = clients);
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const client = this.clientForm.value;
      if (client.id) {
        this.clientService.updateClient(client).subscribe(() => this.loadClients());
      } else {
        this.clientService.addClient(client).subscribe(() => this.loadClients());
      }
      this.clientForm.reset();
    }
  }

  editClient(client: Client): void {
    this.clientForm.setValue(client);
    this.editingClient = client;
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(() => this.loadClients());
  }
}





