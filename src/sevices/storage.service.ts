import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { Cart } from "../models/cart";
import { STORAGE_KEYS } from "../config/storage_keys.config";

//Criar um serviço StorageService para salvar e obter o usuário logado

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }

    }

    setLocalUser(obj : LocalUser) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
        
    }

    //método para obter e salvar o carrinho em localStorage

    //
    getCart() : Cart {
        let usr = localStorage.getItem(STORAGE_KEYS.cart);
        if(usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }

    }
    //
    setCart(obj : Cart) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        } else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
        
    }
}