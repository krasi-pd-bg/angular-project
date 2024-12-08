import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { User } from '../types/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/auth/login`;
    
    return this.http.post<User>(url, { username, password});
  }
  register(username: string, email: string, password: string, rePassword: string) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/auth/register`;
    
    return this.http.post<User>(url, { username, email, password, rePassword});
  }

  logout() {
    const { apiUrl } = environment;
    let url = `${apiUrl}/auth/logout`;
    
    return this.http.get(url, {});
  }
}
