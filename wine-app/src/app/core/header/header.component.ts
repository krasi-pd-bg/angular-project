import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //username = localStorage['user'];
  //get isLoggedIn(): boolean {
  //return !!this.username
    //}

    get isLoggedIn(): boolean {
      return this.userService.isLogged;
    }

    get username(): string {
      return this.userService.user?.username || 'no user';
    }

constructor(private userService: UserService, private router: Router) {}


  logout() {
    this.userService.logout()     
    
    //localStorage.removeItem('user')
    //localStorage.clear();        
  }
}




