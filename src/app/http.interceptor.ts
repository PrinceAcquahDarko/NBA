import { Injectable, NgModule } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GetTeams, IGetResults } from './interface';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<IGetResults | GetTeams>, next: HttpHandler) {
    const headers = new HttpHeaders()
      .append(
        'X-RapidAPI-Key',
        '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKURjsnewgqSP6F5oBX'
      )
      .append('X-RapidAPI-Host', 'free-nba.p.rapidapi.com');
    const cloneReq = req.clone({ headers });

    return next.handle(cloneReq);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class HttpInterceptorModule {}
