import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

// CartService com operações para criar, limpar, obter e adicionar produto ao carrinho

@Injectable()
export class CartService {

    constructor(public storage: StorageService ) {}

    //limpar ou criar o carrinho do storage
    createOrCleanCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    //obter o carrinho, se o carrinho não existir cria o cart
    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if(cart == null) {
            cart = this.createOrCleanCart();
        }
        return cart;
    }

    //add um produto a um carrinho e no storage
    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        //verfica se o produto já está no carrinho
        //encontrar um elemento x tal que x.produto.id seja igual ao id do produto que veio como argumento
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        //-1 é quando não existe no carrinho
        if(position == -1) {
            //add o carrinho
            cart.items.push({quantidade: 1, produto: produto});
        }
        //armazena no storage
        this.storage.setCart(cart);
        return cart;
    }






}