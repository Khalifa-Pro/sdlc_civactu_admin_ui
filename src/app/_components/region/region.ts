import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../_services/region.service';
import { CommonModule } from '@angular/common';
import { RegionModel } from '../../_models/RegionModel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './region.html',
  styleUrl: './region.css'
})
export class Region implements OnInit {
  regions: RegionModel[] = [];
  newRegion: Partial<RegionModel> = {
    name: '',
    code: '',
    description: ''
  };

  constructor(
    private regionService: RegionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions(): void {
    this.regionService.getRegions().subscribe({
      next: (data) => {
        this.regions = Array.isArray(data) ? data : data.data;
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
  this.regionService.addRegion(this.newRegion).subscribe({
    next: (region) => {
      this.regions.push(region);
      this.newRegion = { name: '', code: '', description: '' };

      // Fermer la modale Bootstrap
      const modalEl = document.getElementById('staticBackdrop');
      if (modalEl) {
        // @ts-ignore
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
      this._router.navigateByUrl('/localisations/regions');

      // Optional : ne pas rediriger, on reste sur la même page et la liste est mise à jour
      // this._router.navigateByUrl('/localisations/regions');
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }
}
