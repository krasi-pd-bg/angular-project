import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../types/user';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  owner = {} as User;
  id: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.id = id;

    this.apiService.getOwner(id).subscribe((owner) => {
      if(!owner) {
        this.router.navigate(['/error-page']);
      }
        this.owner = owner;   
      
    })
   

       
    }
   
    
    
    
}
