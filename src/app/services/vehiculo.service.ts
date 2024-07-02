import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private vehiculos: Vehiculo[] = [];
  private idCounter = 1;

  constructor() { }

  getVehiculos(): Observable<Vehiculo[]> {
    return of(this.vehiculos);
  }

  addVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    vehiculo.idvehiculo = this.idCounter++;
    this.vehiculos.push(vehiculo);
    return of(vehiculo);
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo | null> {
    const index = this.vehiculos.findIndex(v => v.idvehiculo === vehiculo.idvehiculo);
    if (index > -1) {
      this.vehiculos[index] = vehiculo;
      return of(vehiculo);
    }
    return of(null);
  }

  deleteVehiculo(id: number): Observable<boolean> {
    const index = this.vehiculos.findIndex(v => v.idvehiculo === id);
    if (index > -1) {
      this.vehiculos.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
