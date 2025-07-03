import { Component } from '@angular/core';
import { MunicipaliteService } from '../../_services/municipalite.service';
import { CommonModule } from '@angular/common';
import { MunicipaliteModel } from '../../_models/MunicipaliteModel';
import { RegionService } from '../../_services/region.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipalite',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './municipalite.html',
  styleUrl: './municipalite.css'
})
export class Municipalite {
  municipalites: any;
  regions: any[] = [];

  newMunicipalite: Partial<MunicipaliteModel> = {
    name: '',
    postalCode: '',
    inseeCode: '',
    description: '',
    latitude: undefined,
    longitude: undefined,
    regionId: ''
  };

  constructor(
    private municipaliteService: MunicipaliteService,
    private regionService: RegionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadMunicipalites();
    this.loadRegions();
  }

  loadMunicipalites(): void {
    this.municipaliteService.getMunicipalities().subscribe({
      next: (data) => (this.municipalites = data.data),
      error: (err) => console.error(err)
    });
  }

  loadRegions(): void {
    this.regionService.getRegions().subscribe({
      next: (data) => (this.regions = Array.isArray(data) ? data : data.data),
      error: (err) => console.error(err)
    });
  }

  onSubmit(form: any): void {
  this.municipaliteService.addMunicipalite(this.newMunicipalite).subscribe({
    next: (m) => {
      this.municipalites.push(m);

      // Réinitialiser l'objet
      this.newMunicipalite = {
        name: '',
        postalCode: '',
        inseeCode: '',
        description: '',
        latitude: undefined,
        longitude: undefined,
        regionId: ''
      };

      // Réinitialiser le formulaire Angular
      form.resetForm();

      // Fermer la modal Bootstrap
      const modalEl = document.getElementById('staticBackdrop');
      if (modalEl) {
        // @ts-ignore
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
      this._router.navigateByUrl('/localisations/municipalites')
    },
    error: (err) => console.error('Erreur ajout', err)
    });
  }

}
