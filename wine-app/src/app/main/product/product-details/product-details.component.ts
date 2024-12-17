import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Wine } from '../../../types/wine';
import { UserService } from '../../../user/user.service';
import { User } from '../../../types/user';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  id: string = '';
  wine = {} as Wine;
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private userService: UserService) { }

  get isAuthenticated(): boolean {
     return this.userService.isLogged
  }
  get isOwner(): boolean {
    return ((this.wine.owner).toString() === this.userService.user?._id)
  }
  get isLiked(): boolean {
    const hasLiked = this.wine?.likedList?.some((likedUserId) => likedUserId === this.userService.user?._id)
    return !!hasLiked
  }

  ngOnInit(): void {
    /*this.route.params.subscribe((data) => {
      console.log(data['id']);      
    })*/
    const id = this.route.snapshot.params['id'];
    this.id = id;
    
    this.apiService.getSingleWine(id).subscribe((wine) => {
      this.wine = wine;
      console.log(wine.owner);
     });    
  }
  remove(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.removeWine(this.id).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }
  vote(): void {
    const id = this.id;
    this.apiService.vote(id).subscribe((data) => {
      this.router.navigate([`/catalog`])
    })
  }
}



