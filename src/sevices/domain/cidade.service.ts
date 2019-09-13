import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";


@Injectable()//para ser injetado em outras classes
export class CidadeService {

    constructor(public http: HttpClient) {
    }
    //busca as cidades de um determinado estado
    findAll(estadoId: string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }

}