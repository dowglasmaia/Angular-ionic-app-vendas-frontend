import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { categoriaDTO } from "../../models/categoria.dto";


@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient ){

    }

    //Metodo q retorna a lista de categorias da minha API Back-End
    findAll() : Observable<categoriaDTO[]> {
        return this.http.get<categoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

}