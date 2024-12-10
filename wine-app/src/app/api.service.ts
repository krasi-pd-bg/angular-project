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
    //let url = `${apiUrl}/catalog`;
    let url = `/api/catalog`; 
    
    return this.http.get<Wine[]>(url);
  }

  getSingleWine(id: string) {
    const { apiUrl } = environment;
    //let url = `${apiUrl}/catalog/${id}/details`;
    let url = `/api/catalog/${id}/details`;
    
    return this.http.get<Wine>(url);
  }

  createWine( name: string, type: string, grapeVariety: string, vintage: number, wineCellar: string, regionCountry: string, price: number, description: string, image: string ) {
    const { apiUrl } = environment;
    //let url = `${apiUrl}/catalog/create`;
    let url = `/api/catalog/create`
    
    return this.http.post<Wine>(url, { name, type, grapeVariety, vintage, wineCellar, regionCountry, price, description, image });
  }
}
