import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorangeService } from '../services/storage.service';

/**
 * @author Dowglas Maia
 * Class para intercepitar e Padronizar os Erros da da Aplicação 
 */

 @Injectable()
 export class ErrorInterceptor implements HttpInterceptor {   

    constructor(public storange: StorangeService) {   }
    
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            //console.log("Passou no Interceptor");
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

                //Trantando erros especificos
                switch(errorObj.status) {
                     case 403:
                     this.handle403();
                     break;  
                }
    
                return Observable.throw(errorObj);
            }) as any;
        }

        //Trantando error 403
        handle403() {
            this.storange.setLocaUser(null); // limpar o localStorange
        }
 }

export const ErrorInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };