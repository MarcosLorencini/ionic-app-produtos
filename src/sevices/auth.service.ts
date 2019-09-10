import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class AuthService {
    //enviar email e senha para o backend

    constructor(public http: HttpClient) {

    }

    authenticate(creds : CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds,
        {
            //pegar o header da resposta
            observe: 'response',
            //retorna uma texto não json, pq o endpoint de login retorna de corpo vazio email e senha vazio
            responseType: 'text'
        })

    }

}