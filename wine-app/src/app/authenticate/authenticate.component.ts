import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(!this.userService.isLogged) {
      this.userService.getProfile().subscribe({
        next: (res) => {
          this.isAuthenticating = false;
        },
        error: (err) => {
          this.isAuthenticating = false;
        },
        complete: () => {
          this.isAuthenticating = false;
        }
      })      
    }
  }
}
