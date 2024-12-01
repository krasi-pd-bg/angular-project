import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wine } from './types/wine';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getWines() {
    const { apiUrl } = environment;
    let url = `${apiUrl}/catalog`;
    
    return this.http.get<Wine[]>(url);
  }

  getSingleWine(id: string) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/catalog/${id}/details`;
    
    return this.http.get<Wine>(url);
  }
}
