import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { Console } from 'console';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  vehiculoForm: FormGroup;
  vehiculos: Vehiculo[] = [];
  editingVehiculo: Vehiculo | null = null;

  constructor(private fb: FormBuilder, private vehiculoService: VehiculoService) {
    this.vehiculoForm = this.fb.group({
      idvehiculo: [null],
      placa: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
      propietario: ['', Validators.required],
      fecharegistro: [new Date(), Validators.required], 
      estadoregistro: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVehiculos();
  }

  loadVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(vehiculos => this.vehiculos = vehiculos);
  }

  onSubmit() {
    console.log("ACA")
    if (this.vehiculoForm.valid) {
      const vehiculo = this.vehiculoForm.value;
      console.log(vehiculo)
      if (vehiculo.idvehiculo) {
        this.vehiculoService.updateVehiculo(vehiculo).subscribe(() => {
          this.loadVehiculos();
          this.vehiculoForm.reset({ fecharegistro: new Date(), estadoregistro: true });
          this.editingVehiculo = null;
        });
      } else {
        this.vehiculoService.addVehiculo(vehiculo).subscribe(() => {
          this.loadVehiculos();
          this.vehiculoForm.reset({ fecharegistro: new Date(), estadoregistro: true });
        });
      }
    }
  }

  editVehiculo(vehiculo: Vehiculo) {
    this.editingVehiculo = vehiculo;
    this.vehiculoForm.patchValue(vehiculo);
  }

  deleteVehiculo(idvehiculo: number) {
    this.vehiculoService.deleteVehiculo(idvehiculo).subscribe(() => {
      this.loadVehiculos();
      this.vehiculoForm.reset();
      this.editingVehiculo = null;
    });
  }
}
