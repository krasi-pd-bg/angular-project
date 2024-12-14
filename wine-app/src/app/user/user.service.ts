import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal } from '@angular/core'
import { User } from '../types/user';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy  {
  
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();
  user: User | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }
  
  constructor(private http: HttpClient) { 
    
    this.userSubscription = this.user$.subscribe((user) => {
    this.user = user;      
    });
  }
 
  login(username: string, password: string) {
    const { apiUrl } = environment;
    //let url = `${apiUrl}/auth/login`;
    let url = `/api/auth/login`;
    
    return this.http
    .post<User>(url, { username, password})
    .pipe(tap((user) => this.user$$.next(user)))
  }
    

  register(username: string, email: string, password: string, rePassword: string) {
    const { apiUrl } = environment;
    //let url = `${apiUrl}/auth/register`;
    let url = `/api/auth/register`;
    
    return this.http.post<User>(url, { username, email, password, rePassword})
    .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfile() {
    let url = `/api/auth/profile`;
    return this.http.get<User>(url)
    .pipe(
      tap((user) => {
        this.user$$.next(user)
      })
    )

  }

  logout() {
    const { apiUrl } = environment;
    //let url = `${apiUrl}/auth/logout`;
    let url = `/api/auth/logout`;
    
    return this.http
      .post(url, {})
      .pipe(tap((user) => this.user$$.next(null)));
        
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
