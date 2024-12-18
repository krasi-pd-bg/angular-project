import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { catchError, map, Observable, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService)
  const router = inject(Router)
  
  return false;

  

}