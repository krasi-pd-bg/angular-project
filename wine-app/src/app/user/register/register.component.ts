import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
errorMsg: string = '';
  constructor (private router: Router, private userService: UserService) { }

  register(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid login form');      
      return;
    }

    const { username, email, password, rePassword } = form.value;
    if (password !== rePassword) {
      this.errorMsg = "Password do not match!";
      return;
    }
    this.userService.register(username, email, password, rePassword).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }
}
