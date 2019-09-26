import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";

//Criar o serviço ClienteService com o método findByEmail
@Injectable()
export class ClienteService {
     
    constructor(public http: HttpClient, public storage: StorageService) {}
    //retorna todos os objetos do backend
    findByEmail(email: string) {   

        //envia a requisicao como o token
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    //pegar a imagem do bucket amazon
    // blob é tipo imagem
    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'})
    }

    //cadastrar cliente
    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    //pega por o cliente por id para se sertificar que o cliente que está armazenado dentro do obj de pedido é o cliente logado
    // e lá tem o id do cliente
    findById(id: string) {   
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }



}