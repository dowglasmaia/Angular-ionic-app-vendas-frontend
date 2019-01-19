import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

/**
 * @author Dowglas Maia
 * Class para intercepitar e Padronizar os Erros da da Aplicação 
 */

 @Injectable()
 export class ErrorInterceptor implements HttpInterceptor {   
    
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            console.log("Passou no Interceptor");
            return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
    
                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);
    
                return Observable.throw(errorObj);
            }) as any;
        }
 }

export const ErrorInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };