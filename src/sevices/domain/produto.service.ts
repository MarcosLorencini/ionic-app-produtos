import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";



@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient ) {

    }

    //obter os produtos de uma dada categoria
    //existe um endpoint no ProdutoResource no java que busca os produtos por categoria
    findByCategoria(categoria_id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`)
    }
}