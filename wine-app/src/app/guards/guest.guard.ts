import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { catchError, of } from 'rxjs';
import { User } from '../types/user';


export const GuestGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    const userService = inject(UserService);
    const router = inject(Router)
    

    return false;

}
