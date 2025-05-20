// src/app/assessor/assessor-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessorService } from '../assessor.service';
import { Assessor } from '../assessor';
import { VehicleService } from '../../vehicle/vehicle.service';  // ←
import { Vehicle } from '../../vehicle/vehicle';                // ←
import { forkJoin, of } from 'rxjs';                           // ←
import { catchError, switchMap } from 'rxjs/operators';        // ←
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessor-delete',
  templateUrl: './assessor-delete.component.html',
  styleUrls: ['./assessor-delete.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AssessorDeleteComponent implements OnInit {
  assessors: Assessor[] = [];
  error: string | null = null;

  constructor(
    private assessorService: AssessorService,
    private vehicleService: VehicleService,  // ←
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAssessors();
  }

  private loadAssessors() {
    this.assessorService.getAssessors().subscribe({
      next: list => this.assessors = list,
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de asesores';
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/assessors', id, 'edit']);
  }

  delete(id: number): void {
    if (!confirm('¿Eliminar este asesor?')) return;

    // 1) cargar todos los vehículos
    this.vehicleService.getVehicles().pipe(
      // 2) filtrar los que apuntan a este asesor
      switchMap((vehicles: Vehicle[]) => {
        const toUnlink = vehicles
          .filter(v => v.assessor?.id === id)
          .map(v => {
            // crear copia del vehículo sin asesor
            const updated: Vehicle = { ...v, assessor: null! };
            return this.vehicleService.updateVehicle(v.id, updated)
              .pipe(catchError(err => {
                console.error('No se pudo desvincular vehículo', v.id, err);
                // seguimos el flujo aun si falla uno
                return of(null);
              }));
          });

        // 3) si no hay ninguno, saltamos directamente
        return toUnlink.length ? forkJoin(toUnlink) : of([]);
      }),
      // 4) una vez actualizados todos, borramos el asesor
      switchMap(() => this.assessorService.deleteAssessor(id))
    ).subscribe({
      next: () => {
        // refrescamos la lista en pantalla
        this.assessors = this.assessors.filter(a => a.id !== id);
      },
      error: err => {
        console.error(err);
        this.error = 'Error al eliminar el asesor';
      }
    });
  }
}
