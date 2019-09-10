import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

//classe que intercepta os erros
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    //intercepta a requisicao que é realizada no app e aplica a logica que esta no método
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passou no interceptor");
        //informa que continua a requisicao
        return next.handle(req)
        //caso aconteca algum
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
            //propaga o erro para o contrololador
            return Observable.throw(errorObj);
        }) as any;
    }
}

//exigencia do framework
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};