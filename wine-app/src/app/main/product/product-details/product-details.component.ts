import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Wine } from '../../../types/wine';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  wine = {} as Wine;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    /*this.route.params.subscribe((data) => {
      console.log(data['id']);      
    })*/
    const id = this.route.snapshot.params['id'];
    
    this.apiService.getSingleWine(id).subscribe((wine) => {
      this.wine = wine;
     });    
  }
  remove(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.apiService.removeWine(id).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

  edit(wine: Wine): void {
  const currentWine = signal(this.wine);
  }

}
