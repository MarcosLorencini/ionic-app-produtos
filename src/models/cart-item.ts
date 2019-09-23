import { ProdutoDTO } from "./produto.dto";


//produto e a quantidade do 
export interface CartItem {
    quantidade: number;
    produto: ProdutoDTO;
}