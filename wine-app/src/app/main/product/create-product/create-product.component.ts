import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  errorMsg: string = '';
  constructor(private router: Router) { }

  create(form: NgForm) {
    
    if (form.invalid) {
      this.errorMsg = 'All fields are required';
      console.error('Invalid login form');      
      return;
    }

    const { name, type, grapeVariety, vintage, wineCellar, regionCountry, price, description, image } = form.value;
    

    this.router.navigate(['/catalog']);
    

  }
}
