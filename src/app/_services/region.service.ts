import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionModel } from '../_models/RegionModel';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'https://api.civactu.flrxnt.com/api/v1/locations/regions';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addRegion(region: Partial<RegionModel>): Observable<RegionModel> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<RegionModel>(this.apiUrl, region, { headers });
  }

}
