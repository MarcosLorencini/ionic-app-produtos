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

    //remover um item do carrinho
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        //verfica se o produto já está no carrinho
        //encontrar um elemento x tal que x.produto.id seja igual ao id do produto que veio como argumento
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        //diferente de 1 o carrinho pode ser removido
        if(position != -1) {
            //add o carrinho
            cart.items.splice(position, 1)
        }
        //armazena no storage
        this.storage.setCart(cart);
        return cart;
    }

    //incrementar a quantidade do produto no carrinho
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        //verfica se o produto já está no carrinho
        //encontrar um elemento x tal que x.produto.id seja igual ao id do produto que veio como argumento
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        //diferente de 1 o carrinho pode ser removido
        if(position != -1) {
            //vai acessar a colecao de itens na posicao e add + 1
            cart.items[position].quantidade++;
        }
        //armazena no storage
        this.storage.setCart(cart);
        return cart;
    }

    //decrementar a quantidade do produto no carrinho
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        //verfica se o produto já está no carrinho
        //encontrar um elemento x tal que x.produto.id seja igual ao id do produto que veio como argumento
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        //diferente de 1 o carrinho pode ser removido
        if(position != -1) {
            //vai acessar a colecao de itens na posicao e add - 1
            cart.items[position].quantidade--;
            //se quantidade for zero remove carrinho
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        //armazena no storage
        this.storage.setCart(cart);
        return cart;
    }

    //valor totatl do carrinho
    total() : number {
        //pega o total do carrinho no stotare
        let cart = this.getCart();
        let sum = 0;
        //percorre os itens do carrinho
        for(var i=0; i<cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
        
    }











}