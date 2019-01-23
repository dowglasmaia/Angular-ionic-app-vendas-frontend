import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorangeService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storange: StorangeService) {

    }

    /* import { Observable } from "rxjs/RX";  -- Usar este import para o Observable*/
    /* Buscar por Email */
    findByEmail(email: string): Observable<ClienteDTO> {

        let token = this.storange.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<ClienteDTO>(
         `${API_CONFIG.baseUrl}/clientes/email?value=${email}`, {'headers': authHeader});
    }

    /* Buscar imagen do cliente no bucket da Amazom S3*/
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}