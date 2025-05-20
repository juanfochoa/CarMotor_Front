import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  selectedSort: string = 'brand-asc';
  isFilterVisible: boolean = false;
  searchTerm: string = '';

  // Filter options
  uniqueTypes: string[] = [];
  uniqueCapacities: string[] = [];
  uniquePlateDigits: string[] = [];
  uniqueBrands: string[] = [];

  // Selected filters
  selectedTypes: Set<string> = new Set();
  selectedCapacities: Set<string> = new Set();
  selectedPlateDigits: Set<string> = new Set();
  selectedBrands: Set<string> = new Set();

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  paginatedVehicles: Vehicle[] = [];
  

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.initializeFilterOptions();
      this.applyFiltersAndSort();
    });
  }

  private initializeFilterOptions(): void {
    this.uniqueTypes = [...new Set(this.vehicles.map(v => v.type))];
    this.uniqueCapacities = [...new Set(this.vehicles.map(v => v.capacity))];
    this.uniquePlateDigits = [...new Set(this.vehicles.map(v => v.lastPlateDigit))];
    this.uniqueBrands = [...new Set(this.vehicles.map(v => v.brand))];
  }

  toggleFilter(filter: string, value: string): void {
    const filterSet = this.getFilterSet(filter);
    if (filterSet.has(value)) {
      filterSet.delete(value);
    } else {
      filterSet.add(value);
    }
    this.applyFiltersAndSort();
  }

  private getFilterSet(filter: string): Set<string> {
    switch (filter) {
      case 'type': return this.selectedTypes;
      case 'capacity': return this.selectedCapacities;
      case 'plateDigit': return this.selectedPlateDigits;
      case 'brand': return this.selectedBrands;
      default: return new Set();
    }
  }

  applyFiltersAndSort(): void {
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      // Search filter
      const searchMatch = !this.searchTerm || 
        vehicle.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.series.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Existing filters
      const typeMatch = this.selectedTypes.size === 0 || this.selectedTypes.has(vehicle.type);
      const capacityMatch = this.selectedCapacities.size === 0 || this.selectedCapacities.has(vehicle.capacity);
      const plateMatch = this.selectedPlateDigits.size === 0 || this.selectedPlateDigits.has(vehicle.lastPlateDigit);
      const brandMatch = this.selectedBrands.size === 0 || this.selectedBrands.has(vehicle.brand);
      
      return searchMatch && typeMatch && capacityMatch && plateMatch && brandMatch;
    });
    
    this.applySorting();
    this.currentPage = 1; // Reset to first page when filters change
    this.updatePaginatedVehicles();
  }

  applySorting() {
    const [field, direction] = this.selectedSort.split('-');
    const isAsc = direction === 'asc';

    this.filteredVehicles.sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'brand':
          comparison = a.brand.localeCompare(b.brand);
          break;
        case 'model':
          const yearA = parseInt(a.model) || 0;
          const yearB = parseInt(b.model) || 0;
          comparison = yearA - yearB;
          break;
        case 'capacity':
          const capA = parseInt(a.capacity) || 0;
          const capB = parseInt(b.capacity) || 0;
          comparison = capA - capB;
          break;
      }

      return isAsc ? comparison : -comparison;
    });
  }

  onSortChange() {
    this.currentPage = 1; // Reset to first page when sorting changes
    this.applySorting();
    this.updatePaginatedVehicles();
  }

  searchVehicles(): void {
    this.applyFiltersAndSort();
  }

  private updatePaginatedVehicles(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.paginatedVehicles = this.filteredVehicles.slice(startIndex, endIndex);
}

onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePaginatedVehicles();
}

onPageSizeChange(newSize: number): void {
  this.pageSize = newSize;
  this.currentPage = 1; // Reset to first page when changing page size
  this.updatePaginatedVehicles();
}

get totalPages(): number {
  return Math.ceil(this.filteredVehicles.length / this.pageSize);
}
}
