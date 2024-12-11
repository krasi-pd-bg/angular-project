import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Wine } from '../../types/wine';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
wines: Wine[] | null = null;

  constructor( private route: ActivatedRoute, private apiService: ApiService) {}
  

  query(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid login form');      
      return;
    }
    const {name, type} = form.value;
  

    this.apiService.search(name, type).subscribe((wines) => {
        this.wines = wines;
        console.log(wines);
    });
}
  
  

}
