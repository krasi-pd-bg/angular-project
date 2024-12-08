import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorComponent } from './error/error.component';
import { SearchComponent } from './main/search/search.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { CreateProductComponent } from './main/product/create-product/create-product.component';
import { EditProductComponent } from './main/product/edit-product/edit-product.component';
import { ProductDetailsComponent } from './main/product/product-details/product-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'auth', 
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
        ]
    },
    {path: 'catalog',
        children: [
            {path: '', component: CatalogComponent},
            {path: 'search', component: SearchComponent},
            {path: 'product',
                children: [
                    {path: 'create', component: CreateProductComponent},
                    {path: 'edit', component: EditProductComponent},
                    {path: 'details/:id', component: ProductDetailsComponent}
                ]
            },

        ]
    },
    
    {path: '**', redirectTo: 'error-page'},
    {path: 'error-page', component: ErrorComponent},
];
