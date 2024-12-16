import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { inject } from '@angular/core';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from './user/user.service';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log(req);
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    })
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);
  const userService = inject(UserService);

  return next(req).pipe(
  catchError((err) => {
    if (err.status === 401 && userService.isLogged) {
      router.navigate(['/auth/login']);
    } else if ((err.status === 401 ||  err.status === 409) && !userService.isLogged)  {
      errorMsgService.setError(err);
    
    } else {
      errorMsgService.setError(err);
      router.navigate(['/error']);
    }

    return [err];
  })
);


};
