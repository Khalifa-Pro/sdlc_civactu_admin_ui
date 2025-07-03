import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report } from '../../_services/report';

@Component({
  selector: 'app-report-component',
  imports: [CommonModule],
  templateUrl: './report-component.html',
  styleUrl: './report-component.css'
})
export class ReportComponent {
  search: string = '';
  reports: any[] = [];

  constructor(private reportService: Report) {}

  ngOnInit(): void {
    this.loadReports(); // Charger les données au démarrage
  }

  loadReports() {
    this.reportService.getReports().subscribe({
      next: (res) => {
        console.log('Réponse API:', res);
        this.reports = res.data ?? res;
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  modifierReport(id: string) {
    
  }

  supprimerReport(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce signalement ?')) {
      this.reportService.deleteReport(id).subscribe({
        next: () => {
          alert('Signalement supprimé avec succès');
          this.loadReports();  // Recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

}
