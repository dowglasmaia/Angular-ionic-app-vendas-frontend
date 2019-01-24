import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorangeService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

/**
 * @author Dowglas Maia
 * Class para intercepitar e incluir o token nas requisições 
 */

 @Injectable()
 export class AuthInterceptor implements HttpInterceptor {  
     
    constructor(public storange: StorangeService) {

    }
    
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

           let localUser = this.storange.getLocalUser();

           /* virificando se a requisição estar sendo feita pela API REST da Aplicação*/
           let N = API_CONFIG.baseUrl.length;
           let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;
           
           // virificando se o localUser existe e se a Requisição e para a API REST da Aplicação
            if(localUser && requestToAPI) {
                //Faz um clone da requisão original e acresenta o cabecalho com o Bearer no mesma
                const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
                return next.handle(authReq);
            }
                else{
                  return next.handle(req)
             }
          
        }
 }

export const AuthInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true,
 };