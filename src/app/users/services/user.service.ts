import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ success: boolean; data: User[] }> {
    return this.http.get<{ success: boolean; data: User[] }>(this.baseUrl);
  }


  getById(id: string): Observable<{ success: boolean; data: User }> {
    return this.http.get<{ success: boolean; data: User }>(`${this.baseUrl}/${id}`);
  }
  
  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  update(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
