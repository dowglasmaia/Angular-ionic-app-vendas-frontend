import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorangeService } from "../storage.service";
import { ImageUtilService } from "../image.util.service";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storange: StorangeService,
        public imageUtilService: ImageUtilService) {

    }

    /* import { Observable } from "rxjs/RX";  -- Usar este import para o Observable*/
    /* Buscar por Email */
    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

     
    /* Buscar por ID */
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    /* Buscar imagen do cliente no bucket da Amazom S3*/
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    /* Salvar Cliente*/
    saveCli(obj: ClienteDTO) {
           return this.http.post(
               `${API_CONFIG.baseUrl}/clientes`,
               obj,{
                observe:'response',
                responseType: 'text'
               }
           );
    }

    /*Enviando Foto de Perfil para AWS */
    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture); // Converte imagem base64 para Blob.

        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,{
             observe:'response',
             responseType: 'text'
            }
        );


    }


}