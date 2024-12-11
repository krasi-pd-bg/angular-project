import { Component, OnInit } from '@angular/core';
import { Wine } from '../../../types/wine';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  wine = {} as Wine;
  errorMsg: string = '';
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }


ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
    
    this.apiService.getSingleWine(id).subscribe((wine) => {
      this.wine = wine;
     });    
}
  edit(form: NgForm) {
    if (form.invalid) {
      this.errorMsg = 'All fields are required';
      console.error('Invalid login form');      
      return;
    }
    const { name, type, grapeVariety, vintage, wineCellar, 
      regionCountry, price, description, image } = form.value;

      
      console.log(form.value);
      const id = this.route.snapshot.params['id'];
      /*this.apiService.editWine(id,
        name, 
        type, 
        grapeVariety, 
        vintage, 
        wineCellar, 
        regionCountry, 
        price, 
        description, 
        image).subscribe(()=> {
        this.router.navigate(['/catalog']);
      });*/
  }
}
