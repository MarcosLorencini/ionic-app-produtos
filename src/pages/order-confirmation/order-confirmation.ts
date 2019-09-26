import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../sevices/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../sevices/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  //para mostrar os itens do carrinho
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService) {
    //pega os dados do pedido 
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    //pega o carrinho
    this.cartItems = this.cartService.getCart().items;
    //busca o cliente por id que está no objeto pedido,ou seja, é o cliente logado
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        //pega os dados do cliente, porém somente os dados que estão no ClienteDTO, isso faz com que não precise trazer todos os dados do cliente
        this.cliente = response as ClienteDTO;
        //enviao id do endereco e o endereco do json
        this.endereco =  this.findEndereco(this.pedido.enderecoDeEntrega.id, response['endereco']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      })

   
  }
  //vai retornar somente o endereco da lista json
  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    this.cartService.total();
  }

}
