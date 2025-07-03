import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MunicipaliteModel } from '../_models/MunicipaliteModel';

@Injectable({
  providedIn: 'root'
})
export class MunicipaliteService {

  private apiUrl = 'https://api.civactu.flrxnt.com/api/v1/locations/municipalities';

  constructor(private http: HttpClient) {}

  getMunicipalities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addMunicipalite(municipalite: Partial<MunicipaliteModel>): Observable<MunicipaliteModel> {
    const token = localStorage.getItem('token');
    return this.http.post<MunicipaliteModel>(this.apiUrl, municipalite, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
}

}
