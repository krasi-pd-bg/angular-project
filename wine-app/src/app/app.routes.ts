import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorComponent } from './error-page/error.component';
import { SearchComponent } from './main/search/search.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { CreateProductComponent } from './main/product/create-product/create-product.component';
import { EditProductComponent } from './main/product/edit-product/edit-product.component';
import { ProductDetailsComponent } from './main/product/product-details/product-details.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { UserComponent } from './user/user.component';

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
                    {path: 'edit/:id', component: EditProductComponent},
                    {path: 'details/:id', component: ProductDetailsComponent},
                    {path: 'owner/:id', component: UserComponent}
                ]
            },

        ]
    },
    {path: 'error', component: ErrorMsgComponent},
    
    {path: '**', redirectTo: 'error-page'},
    {path: 'error-page', component: ErrorComponent},
];
