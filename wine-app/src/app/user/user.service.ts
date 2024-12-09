import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal } from '@angular/core'
import { User } from '../types/user';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

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
  //signal
  private currentUserSignal = signal<User | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();
  //end signal


  constructor(private http: HttpClient) { 
    //
    this.initializeUserFromStorage();
    //
    this.userSubscription = this.user$.subscribe((user) => {
    this.user = user;      
    });
  }
  //
  private initializeUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUserSignal.set(user);
      } catch (error) {
        console.error('Error parsing stored user', error);
        localStorage.removeItem('user');
      }
    }
  }
  //


  login(username: string, password: string) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/auth/login`;
    //
    this.currentUserSignal.set(this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    //
    
    return this.http
    .post<User>(url, { username, password})
    .pipe(tap((user) => this.user$$.next(user)));
    
  }
    

  register(username: string, email: string, password: string, rePassword: string) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/auth/register`;
    
    return this.http.post<User>(url, { username, email, password, rePassword})
    .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    const { apiUrl } = environment;
    let url = `${apiUrl}/auth/logout`;

    //
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
    //
    
    return () => {this.http
      .get(url, {})
      .pipe(tap((user) => this.user$$.next(null)));
    }    
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
