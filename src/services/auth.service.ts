import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/localUser";
import { StorangeService } from "./storage.service";

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    //auxiliar para pegar o email do do token
    jwtHelper: JwtHelper = new JwtHelper(); 
    
    constructor(public http: HttpClient, public storage: StorangeService) {

    }

    /*Envia as Credenciais para o back-end */
    authenticate(creds: CredenciaisDTO) {
      return this.http.post(
            `${API_CONFIG.baseUrl}/login`, creds,
            {
            observe: 'response',
            responseType: 'text'
            });        
    }

    /**Login - Usuario autenticando com o Token e guarda o usuario no localstorange
     *  recebe o token como argumento 
     * */
    successfulLogin(authorizationValue : string) {
        //removendo o nome Bearer e espaço do cabeçalho do token
        let tok = authorizationValue.substring(7);

        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub // pegando email do token
        };
        this.storage.setLocaUser(user); 
    }

      /* Mantendo usuario Logado se o token ainda estiver valido */
      refreshToken() {
        return this.http.post(
             `${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {
                 observe: 'response',
                 responseType: 'text'
              });        
      }

    /**
     * logout
     * remove o Usuario do LocalStorange
     */
    logout() {
        this.storage.setLocaUser(null);
    }

}