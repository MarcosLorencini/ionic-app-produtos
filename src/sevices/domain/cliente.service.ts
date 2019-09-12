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

    findByEmail(email: string) : Observable<ClienteDTO> {   

        //envia a requisicao como o token
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    //pegar a imagem do bucket amazon
    // blob é tipo imagem
    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'})
    }



}