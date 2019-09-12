import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../sevices/storage.service';

//classe que intercepta os erros
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    //intercepta a requisicao que é realizada no app e aplica a logica que esta no método
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //informa que continua a requisicao
        return next.handle(req)
        //caso aconteca algum erro
        .catch((error, caught) => {
            //pega somente o error
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            //tranforma e json
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            //tratar os erros
            switch(errorObj.status) {
                case 403:
                this.handle403();
                break;
            }

            //propaga o erro para o contrololador
            return Observable.throw(errorObj);
        }) as any;
    }

    //trata o erro 403
    //remove o objeto do localStorage
    handle403() {
        this.storage.setLocalUser(null);
    }
}

//exigencia do framework
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};