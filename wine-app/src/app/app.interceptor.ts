import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

const { apiUrl } = environment;
const API = '/';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }

  return next(req);
};
