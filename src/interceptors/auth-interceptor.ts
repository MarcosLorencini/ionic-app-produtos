//Interceptor para incluir token nas requisições
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../sevices/storage.service';
import { API_CONFIG } from '../config/api.config';

//classe que intercepta os erros
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    //intercepta a requisicao que é realizada no app e aplica a logica que esta no método
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //pegar o token que esta no localStorage
        let localUser = this.storage.getLocalUser();
        //código para não enviar header Authorization em caso de requisição para o bucket do S3
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;
        if(localUser && requestToAPI){
            //inserir o cabeçalho na requisicao
            //tem que clonar a req original e acrecendta o header Authorization como o valor Bearer + token
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        } else {
            //propaga a requisicao normal sem acrecentar o header
            return next.handle(req);
        }

        
    }
}

//exigencia do framework
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};

