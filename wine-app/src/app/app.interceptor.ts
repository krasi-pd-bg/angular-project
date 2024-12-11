import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { inject } from '@angular/core';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log(req);
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: false,
    })
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
  /*catchError((err) => {
    if (err.status === 401) {
      router.navigate(['/auth/login']);
    } else {
      errorMsgService.setError(err);
      router.navigate(['/error']);
    }

    return [err];
  })*/
);


};
