import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Wine } from '../../types/wine';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  wines: Wine[] = []; 

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    
    this.ApiService.getWines().subscribe((wines) => this.wines = wines);
  }
}
