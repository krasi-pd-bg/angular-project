import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string = '';
  constructor(private router: Router, private userService: UserService) { }

  login(form: NgForm) {
    
    if (form.invalid) {
      console.error('Invalid login form');      
      return;
    }

    const { username, password } = form.value;
    this.userService.login(username, password).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
    

  }

}
