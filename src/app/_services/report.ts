import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const API_URL = 'https://api.civactu.flrxnt.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class Report {
  constructor(private http: HttpClient) { }

  // Liste Signalement
  getReports(): Observable<any> {
    return this.http.get(`${API_URL}/reports`);
  }

  // Obtenir un Signalement ID
  getReport(id: string): Observable<any> {
    return this.http.get(`${API_URL}/reports/${id}`);
  }

  // Créer un nouveau report
  createReport(data: any): Observable<any> {
    return this.http.post(`${API_URL}/reports`, data);
  }

  // Supprimer un report par ID
  deleteReport(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/reports/${id}`);
  }

  // Mettre à jour un report
  updateReport(id: string, data: any): Observable<any> {
    return this.http.put(`${API_URL}/reports/${id}`, data);
  }

  // Assigner un report
  assignReport(id: string, data: any): Observable<any> {
    return this.http.post(`${API_URL}/reports/${id}/assign`, data);
  }
}
