import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../sevices/storage.service';
import { ClienteService } from '../../sevices/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../sevices/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  //pedido que vai trafegar na paginas de fechamento de pedido e ao longo de cada passo vai preenchendo os dados
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      //buscar o cliente por email e imagem avatar
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //pega os enderecos que retornar do cliente
          this.items = response['endereco'];

          //pega o carrinho que está armazenado no localstorage
          let cart = this.cartService.getCart();

          this.pedido = {
            //já possui o cliente quando for buscar por email
            cliente: {id: response['id']},
            //no momento não tem, pois o usuário ainda vai escolher 
            enderecoDeEntrega: null,
             //no momento não tem, pois o usuário ainda vai escolher 
             pagamento: null,
             //são os itens do carrinho, porém do formato quantidade e produto qeu está  no storage
             //pegar o carrinho no storage e converter no formato json quantidade e produto
             //percorre a lista e pega os valores quantidade e id do produto do cart e joga em quantidade e id do produto de ItemPedidoDTO[]
             itens: cart.items.map(x => {return{quantidade: x.quantidade, produto: {id: x.produto.id}}})



          }
         
        },
        error => {
          if(error.status == 403){
            //direciona para home
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else {
      //caso ocorra algum problema para pegar o localUser direceiona para a home
      this.navCtrl.setRoot('HomePage');
    }
    
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }

}
