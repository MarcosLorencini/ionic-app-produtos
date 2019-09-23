import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";



@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient ) {

    }

    //obter os produtos de uma dada categoria
    //existe um endpoint no ProdutoResource no java que busca os produtos por categoria
    findByCategoria(categoria_id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`)
    }

    //rebece o id do produto , carrega busca as imagens pequenas da relação de produtos dentro da categoria
    getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});//espera resposta blob
    }
}